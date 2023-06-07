import {THREE, GLTFLoader} from './three_libs_import.js'
import {TextGeometry, FontLoader, CSS2DRenderer,CSS2DObject} from "./three_libs_import.js";
import {audioManager} from './audioManager.js'
let globalscene, ailaser, AWingBlast
const enemyAI = {
    starFightersObjectList : [],

    enemyInit:function (scene, loader){
        globalscene = scene

        let AWingModel, YWingModel, XWingModel, TIEFModel, TIEBModel, TIEDModel;

        function loadersInit(){
            AWingBlast = audioManager.audioList.AWingBlast
            enemyAI.ailaserBehavior(scene);
            loader.load('resource/3DModels/StarDestroyerFlagman/scene.gltf', function(gltf){
                let star_destroyer = gltf.scene
                star_destroyer.scale.set(50,50,50);
                star_destroyer.name = 'Star_Destroyer';
                scene.add(gltf.scene);
                star_destroyer.position.x = -50000;//-100000
                star_destroyer.position.y = -6000;//-6000
                star_destroyer.position.z = 0;
            });
    
            loader.load('resource/3DModels/MonCalamaryFlagman/scene.gltf', function(gltf){
                let mon_calamari = gltf.scene
                mon_calamari.scale.set(30,30,30);
                mon_calamari.name = 'Mon_Calamary';
                scene.add(gltf.scene);
                mon_calamari.position.x = 50000;//100000
                mon_calamari.position.y = -9000; //-9000
                mon_calamari.position.z = 0;
            });
    
            for (let i=1; i<=20; i++){
                loader.load('resource/3DModels/A-Wing/scene.gltf', function(AWing){
                    AWingModel = AWing.scene
                    AWingModel.scale.set(30,30,30);
                    AWingModel.name = 'A-Wing';
                    AWingModel.type = `starfighter${i}`
                    let AWing01 = AWingModel;
                    
                    const centerSignDiv = document.createElement( 'div' );
                    centerSignDiv.style.zIndex = 1;
                    centerSignDiv.className = 'css2Text';
                    centerSignDiv.textContent = '¤';
                    centerSignDiv.style.backgroundColor = 'transparent';
  
                    const centerSignLabel = new CSS2DObject( centerSignDiv );
                    centerSignLabel.position.set( 0, 0, 1 );
                    centerSignLabel.name = 'centerSign'
                    AWing01.add(centerSignLabel);

                    const distanceDiv = document.createElement( 'div' );
                    distanceDiv.style.zIndex = 1;
                    distanceDiv.className = 'css2DistanceText';
                    distanceDiv.textContent = 'distance';
                    distanceDiv.style.backgroundColor = 'transparent';
  
                    const distanceLabel = new CSS2DObject( distanceDiv );
                    distanceLabel.position.set( 0, 15, 0 );
                    distanceLabel.name = 'distanceText'
                    console.log(distanceLabel.name)
                    AWing01.add(distanceLabel);
    
                    AWing01.children[0].children[0].children[0].children[0].children[0].material.emissive.r = 0.5
                    AWing01.children[0].children[0].children[0].children[0].children[0].material.emissive.g = 0.5
                    AWing01.children[0].children[0].children[0].children[0].children[0].material.emissive.b = 0.5


                    scene.add(AWing01);
                    AWing01.position.x = Math.random()*40000+5000;
                    AWing01.position.y = (Math.random()-0.5)*50000;
                    AWing01.position.z = (Math.random()-0.5)*50000;

                    AWing01.rotation.x = (Math.random())*2*Math.PI;
                    AWing01.rotation.y = (Math.random())*2*Math.PI;
                    AWing01.rotation.z = (Math.random())*2*Math.PI;

                    AWing01.acceleration = {
                        maxSpeed : 1,//100,
                        destSpeed : 1,
                        actSpeed : 0,
                        normalSpeed: 0,//20,
                        speed : 0,
                        accelerationX : 0,
                        accelerationY : 0,
                        accelerationZ : 0,
            
                        rotAccelerationX :0,
                        rotAccelerationY :0,
                        rotAccelerationZ :0,
                    };

                    const sTPos = new THREE.Vector3();
                    AWing01.vectorShip = new THREE.Vector3();
                    let vectorShip = AWing01.vectorShip;
                    const shipGlobalPosition = new THREE.Vector3();
                    AWing01.overheat = false

                    AWing01.reCompute = function(scene) {
                        shipGlobalPosition.copy(AWing01.position);
            
                        centerSignLabel.getWorldPosition(sTPos);
                        vectorShip.set(
                            (sTPos.x - shipGlobalPosition.x ),
                            (sTPos.y - shipGlobalPosition.y ),
                            (sTPos.z - shipGlobalPosition.z ),
                        )
            
                        let actSpeed = AWing01.acceleration.speed;
                        let destSpeed = AWing01.acceleration.destSpeed;
                        let maxSpeed = AWing01.acceleration.maxSpeed;
                        
                        if (destSpeed!=actSpeed){
                            if (destSpeed>actSpeed) {
                                actSpeed<0?AWing01.acceleration.speed = 0:AWing01.acceleration.speed+=maxSpeed/60;
                            } 
                            if (destSpeed<actSpeed) {
                                if (actSpeed<0) {
                                    AWing01.acceleration.speed = maxSpeed
                                } else {
                                    AWing01.acceleration.speed-=maxSpeed/60;
                                }
                            }
                        }
            
                        AWing01.acceleration.accelerationX = actSpeed*vectorShip.x;
            
                        AWing01.acceleration.accelerationY = actSpeed*vectorShip.y;
            
                        AWing01.acceleration.accelerationZ = actSpeed*vectorShip.z;
            
                        AWing01.rotation.z+=this.acceleration.rotAccelerationZ;
                        AWing01.rotation.x-=this.acceleration.rotAccelerationX;
                        AWing01.rotation.y+=this.acceleration.rotAccelerationY;
            
                        AWing01.position.x += this.acceleration.accelerationX;
                        AWing01.position.y += this.acceleration.accelerationY;
                        AWing01.position.z += this.acceleration.accelerationZ;

                        if (AWing01.position.x>60000){
                            AWing01.position.x -=200;
                            AWing01.rotation.z+=90/180*Math.PI; 
                            AWing01.rotation.y+=90/180*Math.PI;
                        }
                        if (AWing01.position.x<-60000){
                            AWing01.position.x +=200;
                            AWing01.rotation.z-=90/180*Math.PI; 
                            AWing01.rotation.y-=90/180*Math.PI;
                        }
                        if (AWing01.position.y>60000){
                            AWing01.position.y -=200;
                            AWing01.rotation.x+=90/180*Math.PI; 
                            AWing01.rotation.z+=90/180*Math.PI;
                        }
                        if (AWing01.position.y<-60000){
                            AWing01.position.y +=200;
                            AWing01.rotation.x-=90/180*Math.PI; 
                            AWing01.rotation.z-=90/180*Math.PI;
                        }

                        if (AWing01.position.z>60000){
                            AWing01.position.z -=200;
                            AWing01.rotation.x+=90/180*Math.PI; 
                            AWing01.rotation.y+=90/180*Math.PI;
                        }
                        if (AWing01.position.z<-60000){
                            AWing01.position.z +=200;
                            AWing01.rotation.x-=90/180*Math.PI; 
                            AWing01.rotation.y-=90/180*Math.PI;
                        }

                        AWing01.rotAccelerationX = Math.random()*0.03-0.015;
                        AWing01.rotAccelerationY = Math.random()*0.03-0.015;
                        AWing01.rotAccelerationZ = Math.random()*0.03-0.015;


                        if (scene.getObjectByName('TIE_Defender',true)){

                            let playership = scene.getObjectByName('TIE_Defender',true);

                            let distance = AWing01.position.distanceTo(playership.position);

                            distanceDiv.textContent = Math.round(distance);

                            if (distance<10000){
                                AWing01.lookAt(playership.position);
                                AWing01.acceleration.destSpeed = 1
                                if (distance<3000){
                                    AWing01.acceleration.destSpeed = 0
                                }
                                if (!AWing01.overheat){
                                    console.log('shoot!')
                                    enemyAI.aiLaserCreate(AWing01);
                                    AWing01.overheat = true
                                    setTimeout(() => {
                                        AWing01.overheat = false
                                    }, 1000);                        
                                }
                            }
                        }
                    }
                    enemyAI.starFightersObjectList.push(AWing01)
                });
            };
        } 
        loadersInit()
    },

    aiUnitAttack: function(aiUnit, playership){

    },

    aiLaserCreate: function(aiUnit){
            let laserName = `laser_${Date.now()}`;
            let laserMaterial = new THREE.MeshBasicMaterial( { 
                color: 0xFF0000,
                opacity:0.9,
                transparent: true
            });
            class CustomSinCurve extends THREE.Curve {
                constructor( scale = 1 ) {
                    super();
                    this.scale = scale;
                }
                getPoint( t, optionalTarget = new THREE.Vector3() ) {
                    const tx = 0;
                    const ty = 0;
                    const tz = t;
                    return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
                }
            }
            const path = new CustomSinCurve( 250 );

            let laserGeometry = new THREE.TubeGeometry(path, 8, 15, 8, true);

            let newLaser = new THREE.Mesh(laserGeometry, laserMaterial);

            newLaser.rotation.x = aiUnit.rotation.x
            newLaser.rotation.z = aiUnit.rotation.z
            newLaser.rotation.y = aiUnit.rotation.y

            const laserVector = new THREE.Vector3();  
            newLaser.laserVector = aiUnit.vectorShip;
            newLaser.name = laserName;
            newLaser.lifeTime = 1000;
            newLaser.position.x = aiUnit.position.x+newLaser.laserVector.x*(1+aiUnit.acceleration.speed);
            newLaser.position.y = aiUnit.position.y+newLaser.laserVector.y*(1+aiUnit.acceleration.speed);
            newLaser.position.z = aiUnit.position.z+newLaser.laserVector.z*(1+aiUnit.acceleration.speed);

            let starfighter2 = globalscene.getObjectByProperty('type','starfighter2')

            ailaser.laserList[laserName] = {
                positionX : newLaser.position.x,
                positionY : newLaser.position.y,
                positionZ : newLaser.position.z,

                vectorX: newLaser.laserVector.x,
                vectorY: newLaser.laserVector.y,
                vectorZ: newLaser.laserVector.z,

                collisionStarfighter2 : 0,
            };
            ailaser.laserList[laserName].startSpeed = aiUnit.acceleration.destSpeed;
            globalscene.add(newLaser);
            AWingBlast.pause();
            AWingBlast.currentTime = 0;
            AWingBlast.play();

            setTimeout(() => {
                globalscene.remove(newLaser)
                newLaser = null;
                delete ailaser.laserList[laserName]
            }, newLaser.lifeTime);
    },

    ailaserBehavior: function(scene){

        ailaser = {};
        ailaser.speed = 20;
        ailaser.laserList = {};

        ailaser.laserRedraw = function(){
            let laserIDs = Object.keys(this.laserList)
            let speed = ailaser.speed;
            

            laserIDs.forEach(laserID => {
            
                let laserScene = globalscene.getObjectByName(laserID,true)

                this.laserList[laserID].positionX +=(speed+this.laserList[laserID].startSpeed)*this.laserList[laserID].vectorX;
                this.laserList[laserID].positionY +=(speed+this.laserList[laserID].startSpeed)*this.laserList[laserID].vectorY;
                this.laserList[laserID].positionZ +=(speed+this.laserList[laserID].startSpeed)*this.laserList[laserID].vectorZ;

                laserScene.position.x = this.laserList[laserID].positionX
                laserScene.position.y = this.laserList[laserID].positionY
                laserScene.position.z = this.laserList[laserID].positionZ

                let playership = globalscene.getObjectByName('TIE_Defender')
                if (laserScene != undefined){
                    let distance = laserScene.position.distanceTo(playership.position);
                    if (distance <=200){
                        console.log(`player Hitted!`)
                        playership.healthPoint -=10;
                        laserScene.position.z = -1000000
                        globalscene.remove(laserScene)
                        laserScene = null;
                        delete this.laserList[laserID]
                    }
                }            
            });
        };
    },


}



export {enemyAI,ailaser}