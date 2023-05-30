// import { OrbitControls } from "https://unpkg.com/three@0.126/examples/jsm/controls/OrbitControls.js";
import {THREE, GLTFLoader} from './three_libs_import.js'
import {environmentInit} from './environmentInit.js'
import { starfightersInit } from './starfightersInit.js'
import { FlyControls } from './three_libs_import.js'
let scene, camera, renderer, playersShip, laser, fControls, TIEBlast, animationState;
let loader = new GLTFLoader();
let listeners = [];

function battleInit() {
    animationState = 'run';
    TIEBlast = new Audio();
    TIEBlast.preload = 'auto';
    TIEBlast.volume = 0.1;
    TIEBlast.src = 'resource/3DModels/TIE-Defender/blast.mp3';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000000 );
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = 'battleWindow';
    document.body.appendChild(renderer.domElement);

    environmentInit(scene, loader)
    starfightersInit(scene, loader)

    loader.load('resource/3DModels/TIE-Defender/scene.gltf', function(gltf){
        let starfighter = gltf.scene
        starfighter.scale.set(10,10,10);
        starfighter.name = 'TIE_Defender';
        starfighter.type = 'starfighter'
        scene.add(gltf.scene);
        
        playershipAttaching(scene);
        laserBehavior(scene);
        setTimeout(() => {
            animate(); 
            setTimeout(() => {
                battlelistenersInit()
            }, 200);
        }, 200);
    });

    function playershipAttaching(scene){

        playersShip = scene.getObjectByName('TIE_Defender',true)

        fControls = new FlyControls( playersShip, renderer.domElement );

        fControls.movementSpeed = 0;
        fControls.domElement = renderer.domElement;
        fControls.rollSpeed = Math.PI / 180;
        fControls.autoForward = false;
        fControls.dragToLook = false;



        playersShip.acceleration = {
            maxSpeed : 15,//100,
            destSpeed : 0,
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
        playersShip.rotation.y = 90/180*Math.PI;
        playersShip.attach(camera);
        camera.position.y = 20;
        camera.position.z = -40;
        camera.rotation.y = 180/180*Math.PI;
        camera.rotation.x = 15/180*Math.PI;

        let shipRotationTargetGlobalPosition = new THREE.Vector3();
        playersShip.rotationVectorShip = new THREE.Euler();

        let starfightersList = ['starfighter1', 'starfighter2', 'starfighter3', 'starfighter4', 'starfighter5', 'starfighter6', 'starfighter7', 'starfighter8', 'starfighter9', 'starfighter10']
        let starFightersObjectList = [];

        starfightersList.forEach(element => {
            let sfo = scene.getObjectByProperty('type', element);
            starFightersObjectList.push(sfo)
        });


        const geometryTarget = new THREE.SphereGeometry( 5, 32, 16 );
        const materialTarget = new THREE.MeshBasicMaterial( { color: 0xFF0000 } ); 
        const shipTarget = new THREE.Mesh(geometryTarget, materialTarget);
        scene.add(shipTarget)
        playersShip.attach(shipTarget)
        shipTarget.position.z = 45

        const sTPos = new THREE.Vector3();
        playersShip.vectorShip = new THREE.Vector3();
        let vectorShip = playersShip.vectorShip;
        const shipGlobalPosition = new THREE.Vector3();



        playersShip.reCompute = function() {

            shipGlobalPosition.copy(playersShip.position);

            shipTarget.getWorldPosition(sTPos);
            vectorShip.set(
                (sTPos.x - shipGlobalPosition.x )/45,
                (sTPos.y - shipGlobalPosition.y )/45,
                (sTPos.z - shipGlobalPosition.z )/45,
            )

            let actSpeed = this.acceleration.speed;
            let destSpeed = this.acceleration.destSpeed;
            let maxSpeed = this.acceleration.maxSpeed;
            
            if (destSpeed!=actSpeed){
                if (destSpeed>actSpeed) {
                    actSpeed<0?this.acceleration.speed = 0:this.acceleration.speed+=maxSpeed/60;
                } 
                if (destSpeed<actSpeed) {
                    if (actSpeed<0) {
                        this.acceleration.speed = maxSpeed
                    } else {
                        this.acceleration.speed-=maxSpeed/60;
                    }
                }
            }

            this.acceleration.accelerationX = actSpeed*vectorShip.x;

            this.acceleration.accelerationY = actSpeed*vectorShip.y;

            this.acceleration.accelerationZ = actSpeed*vectorShip.z;

            this.rotation.z+=this.acceleration.rotAccelerationZ;
            this.rotation.x-=this.acceleration.rotAccelerationX;
            this.rotation.y+=this.acceleration.rotAccelerationY;

            this.position.x += this.acceleration.accelerationX;
            this.position.y += this.acceleration.accelerationY;
            this.position.z += this.acceleration.accelerationZ;
            

            // starFightersObjectList.forEach(element => {
            //     element.lookAt(playersShip.position)
            // })

        }
    };

    function laserCreate(playersShip){
        let laserName = `laser_${Date.now()}`;
        let laserMaterial = new THREE.MeshBasicMaterial( { 
            color: 0x00FF00,
            opacity:0.9,
            transparent: true
        });
        

        let laserGeometry = new THREE.SphereGeometry( 10, 10, 16);

        let newLaser = new THREE.Mesh(laserGeometry, laserMaterial);

        newLaser.rotation.x = 90/180*Math.PI
        newLaser.rotation.z = 0/180*Math.PI-playersShip.rotation.y



        const laserVector = new THREE.Vector3();  
        newLaser.laserVector = playersShip.vectorShip;
        newLaser.name = laserName;
        newLaser.lifeTime = 1000;
        newLaser.position.x = playersShip.position.x+newLaser.laserVector.x*(10+playersShip.acceleration.speed);
        newLaser.position.y = playersShip.position.y+newLaser.laserVector.y*(10+playersShip.acceleration.speed);
        newLaser.position.z = playersShip.position.z+newLaser.laserVector.z*(10+playersShip.acceleration.speed);

        let starfighter2 = scene.getObjectByProperty('type','starfighter2')
        


        laser.laserList[laserName] = {
            positionX : newLaser.position.x,
            positionY : newLaser.position.y,
            positionZ : newLaser.position.z,

            vectorX: newLaser.laserVector.x,
            vectorY: newLaser.laserVector.y,
            vectorZ: newLaser.laserVector.z,

            collisionStarfighter2 : 0,
        };
        laser.laserList[laserName].startSpeed = playersShip.acceleration.destSpeed;
        scene.add(newLaser);
        TIEBlast.pause();
        TIEBlast.currentTime = 0;
        TIEBlast.play();

        setTimeout(() => {
            scene.remove(newLaser)
            newLaser = null;
            delete laser.laserList[laserName]
        }, newLaser.lifeTime);

    }

    function laserBehavior(scene){
        laser = {};
        laser.speed = 25;
        laser.laserList = {};
        let starfightersList = ['starfighter1', 'starfighter2', 'starfighter3', 'starfighter4', 'starfighter5', 'starfighter6', 'starfighter7', 'starfighter8', 'starfighter9', 'starfighter10']
        let starFightersObjectList = []
        starfightersList.forEach(element => {
            let sfo = scene.getObjectByProperty('type', element);
            starFightersObjectList.push(sfo)
        });

        laser.laserRedraw = function(){
            let laserIDs = Object.keys(this.laserList)
            let speed = this.speed;
            

            laserIDs.forEach(laserID => {
            
                let laserScene = scene.getObjectByName(laserID,true)

                this.laserList[laserID].positionX +=(speed+this.laserList[laserID].startSpeed)*this.laserList[laserID].vectorX;
                this.laserList[laserID].positionY +=(speed+this.laserList[laserID].startSpeed)*this.laserList[laserID].vectorY;
                this.laserList[laserID].positionZ +=(speed+this.laserList[laserID].startSpeed)*this.laserList[laserID].vectorZ;

                laserScene.position.x = this.laserList[laserID].positionX
                laserScene.position.y = this.laserList[laserID].positionY
                laserScene.position.z = this.laserList[laserID].positionZ


                starFightersObjectList.forEach(element => {
                    // element.lookAt(playersShip.position)
                    if (laserScene){
                        let distance = laserScene.position.distanceTo(element.position);
                        if (distance <=100){
                            console.log(`hit ${element.type}`)
                            element.position.z = 10000000
                            laserScene.position.z = -1000000
                            scene.remove(element)
                            element.clear()
                            element = null;
                            scene.remove(laserScene)
                            laserScene = null;
                            delete this.laserList[laserID]
                        }
                    }
                });
            });
        };
    }

    function animate(){

            if(animationState == 'run'){
                fControls.update(1)
                let  shipAcc = playersShip.acceleration;
                playersShip.reCompute();
                renderer.render(scene,camera);
                laser.laserRedraw()
            } else if (animationState == 'pause'){
                TIEBlast.pause();
                let escapeWindow = document.getElementById('escapeWindow');
                // let btnOptions = document.getElementById('btnOptionsEscape');
                // let btnResume = document.getElementById('btnResumeBattleEscape');
                // let btnLeave = document.getElementById('btnLeaveBattleEscape');
                escapeWindow.classList.remove('сlosedWindow');
                escapeWindow.addEventListener('click', function (event){
                    if (!event.repeat) {
                        switch (event.target.id){
                            // case 'btnOptionsEscape':console.log('Option window')
    
                            case 'btnLeaveBattleEscape':{
                                battleWindowControl.battleStop();
                                break;
                            }
                            case 'btnResumeBattleEscape':{
                                escapeWindow.classList.add('сlosedWindow');
                                battleWindowControl.battleResume();
                                break;
                            }
                        }
                    }
                })
            }
        
        requestAnimationFrame(animate)
    }

    function battlelistenersInit(){
        let canvasWindow = document.getElementById('battleWindow')
        addEventListener('keydown',function(event){
            if (!event.repeat) {
                let shipAcc = playersShip.acceleration;
        
                event.preventDefault()
                switch (event.key) {
                    case ('w'): {
                        shipAcc.destSpeed = shipAcc.maxSpeed;
                        break
                    }
                    case ('s'): {
                        shipAcc.speed = 0;  
                        break
                    }
                    // case ('a'): {
                    //     shipAcc.rotAccelerationY = 2/180*Math.PI;    
                    //     break
                    // }
                    // case ('d'): {
                    //     shipAcc.rotAccelerationY = -2/180*Math.PI;    
                    //     break
                    // }
                    // case ('e'): {
                    //     shipAcc.rotAccelerationZ = 2/180*Math.PI;    
                    //     break
                    // }
                    // case ('q'): {
                    //     shipAcc.rotAccelerationZ = -2/180*Math.PI;    
                    //     break
                    // }
                    // case ('z'): {
                    //     shipAcc.accelerationY = 25;       
                    //     break
                    // }
                    // case ('c'): {
                    //     shipAcc.accelerationY = -25;   
                    //     break
                    // }
                    // case ('z'): {
                    //     // shipAcc.rotAccelerationX += 1/180*Math.PI;   
                    //     shipAcc.accelerationY = shipAcc.acceleration.maxSpeed;    
                    //     break
                    // }
                    // case ('c'): {
                    //     // shipAcc.rotAccelerationX -= 1/180*Math.PI;    
                    //     shipAcc.accelerationY = -shipAcc.acceleration.maxSpeed;    
                    //     break
                    // }
                    // case ('space'): {
                    //     console.log('SpaceBar') 
                    //     break
                    // }
                }
                // console.log(event.key) 
            }
        })
        
        addEventListener('keyup',function(event){
            event.preventDefault()
            let shipAcc = playersShip.acceleration;
            switch (event.key) {
                case ('w'): {
                    shipAcc.destSpeed = 0;
                    break
                }
                case ('s'): {
                    shipAcc.destSpeed = 0;
                    break
                }
                // case ('a'): {
                //     shipAcc.rotAccelerationY = 0;    
                //     break
                // }
                // case ('d'): {
                //     shipAcc.rotAccelerationY = 0;    
                //     break
                // }
                // case ('e'): {
                //     shipAcc.rotAccelerationZ = 0;    
                //     break
                // }
                // case ('q'): {
                //     shipAcc.rotAccelerationZ = 0;    
                //     break
                // }
                // case ('z'): {
                //     // shipAcc.rotAccelerationX = 0/180*Math.PI;   
                //     shipAcc.accelerationY = 0;    
                //     break
                // }
                // case ('c'): {
                //     // shipAcc.rotAccelerationX = 0/180*Math.PI;    
                //     shipAcc.accelerationY = 0;    
                //     break
                // }
            }
        })
        
        canvasWindow.addEventListener('click', function(event){
            if (document.getElementById('escapeWindow').classList.contains('сlosedWindow')){
                laserCreate(playersShip)
            };
        })
        
        
        window.addEventListener( 'resize', onWindowResize, false );

        document.addEventListener('keydown',(event)=>{
            if(event.key === 'Escape' && (document.getElementById('battleWindow'))){
                animationState = 'pause'
            }
        })
        // listeners = [listener1, listener2, listener3, listener4]
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
}

const battleWindowControl = {
    // battleOver : function(){
    //     let canv = document.getElementById('battleWindow');
    //     canv.remove()
    //     canv = null
    //     scene, camera, renderer, playersShip, laser, fControls, TIEBlast,animationState = null
    // },

    battleStop : function(){
        animationState = 'stop';

    },
    battlePause : function(){
        animationState = 'pause'
    },

    battleResume : function(){
        animationState = 'run'
    },
}

export {battleInit, battleWindowControl}