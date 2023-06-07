import {THREE, GLTFLoader} from './three_libs_import.js'
import {TextGeometry, FontLoader, CSS2DRenderer,CSS2DObject} from "./three_libs_import.js";
import {environmentInit} from './environmentInit.js'
import { enemyAI, ailaser } from './starfightersInit.js'
import { FlyControls } from './three_libs_import.js'
import{gamePadUnit} from './gamePadModule.js'
import{userInterFace}from './userInterFace.js'
import {options} from './options.js'
import {audioManager} from './audioManager.js'

let scene, camera, renderer, playersShip, laser, fControls, TIEBlast, animationState, labelRenderer,target;
let loader = new GLTFLoader();

function battleInit() {
    userInterFace.userInterfaceInit();
    animationState = 'run';
    TIEBlast = audioManager.audioList.TIEBlast

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000000 );
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = 'battleWindow';
    renderer.domElement.style.zIndex = -2;
    document.body.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.classList.add('hiddenCursor');
    labelRenderer.domElement.id = 'css2RenderText';
    document.body.appendChild( labelRenderer.domElement );

    environmentInit(scene, loader)
    enemyAI.enemyInit(scene, loader)

    loader.load('resource/3DModels/TIE-Defender/scene.gltf', function(gltf){
        let starfighter = gltf.scene
        starfighter.scale.set(30,30,30);
        starfighter.name = 'TIE_Defender';
        starfighter.type = 'starfighter'
        scene.add(gltf.scene);
        
        playershipAttaching(scene);
        laserBehavior(scene);
        setTimeout(() => {
            animate(); 
            setTimeout(() => {
                battlelistenersInit()
            }, 400);
        }, 0);
    });

    function playershipAttaching(scene){

        playersShip = scene.getObjectByName('TIE_Defender',true)
        playersShip.laserOverHeat = false;
        playersShip.healthPoint = 200;
        playersShip.overHeatTime = 50;
        fControls = new FlyControls( playersShip, labelRenderer.domElement );

        fControls.movementSpeed = 0;
        fControls.domElement = labelRenderer.domElement;
        fControls.rollSpeed = Math.PI / 180;
        fControls.autoForward = false;
        fControls.dragToLook = false;

        const targetDiv = document.createElement( 'div' );
        targetDiv.style.zIndex = 2;
        targetDiv.className = 'css2Text';
        targetDiv.textContent = '- -';
        targetDiv.style.backgroundColor = 'transparent';
        let targetLabel = new CSS2DObject( targetDiv );
        targetLabel.position.set( 0, 0, 400 );
        targetLabel.name = 'testing_text1'
        playersShip.add( targetLabel);

        const targetDiv2 = document.createElement( 'div' );
        targetDiv2.style.zIndex = 2;
        targetDiv2.className = 'css2Text2';
        targetDiv2.textContent = '-    -';
        targetDiv2.style.backgroundColor = 'transparent';
        let targetLabel2 = new CSS2DObject( targetDiv2);
        targetLabel2.position.set( 0, 0, 100 );
        targetLabel2.name = 'testing_text2'
        playersShip.add( targetLabel2 );

        const targetDiv3 = document.createElement( 'div' );
        targetDiv3.style.zIndex = 2;
        targetDiv3.className = 'css2Text3';
        targetDiv3.textContent = '|';
        targetDiv3.style.backgroundColor = 'transparent';
        let targetLabel3 = new CSS2DObject( targetDiv3);
        targetLabel3.position.set( 0, 0, 50 );
        targetLabel3.name = 'testing_text3'
        playersShip.add( targetLabel3 );

        playersShip.acceleration = {
            maxSpeed : 5,//100,
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
        camera.position.y = 10;
        camera.position.z = -20;
        camera.rotation.y = 180/180*Math.PI;
        camera.rotation.x = 0/180*Math.PI;

        const geometryTarget = new THREE.SphereGeometry( .1, 32, 16 );
        const materialTarget = new THREE.MeshBasicMaterial( {} ); 
        const shipTarget = new THREE.Mesh(geometryTarget, materialTarget);
        scene.add(shipTarget)
        playersShip.attach(shipTarget)
        shipTarget.position.z = 45


        
        const sTPos = new THREE.Vector3();
        playersShip.vectorShip = new THREE.Vector3();
        let vectorShip = playersShip.vectorShip;
        const shipGlobalPosition = new THREE.Vector3();


        playersShip.laserOverHeating = function(){
            playersShip.laserOverHeat = true;
            setTimeout(() => {
                playersShip.laserOverHeat = false; 
            }, playersShip.overHeatTime);
        }

        playersShip.reCompute = function() {
            let healthBar = document.getElementById('health-fill')
            healthBar.style.width = `${playersShip.healthPoint/2}%`;
            // console.log(healthBar.style.width)
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
        }

        playersShip.death = {
            isDead: function(){
                playersShip.position.x = -50000;
                playersShip.position.y = -8000;
                playersShip.position.z = 3000;
                playersShip.healthPoint = 200;
            }
        }



    };

    function laserCreate(playersShip){
        if (!playersShip.laserOverHeat){
            let laserName = `laser_${Date.now()}`;
            let laserMaterial = new THREE.MeshBasicMaterial( { 
                color: 0x00FF00,
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

            newLaser.rotation.x = playersShip.rotation.x
            newLaser.rotation.z = playersShip.rotation.z
            newLaser.rotation.y = playersShip.rotation.y

            const laserVector = new THREE.Vector3();  
            newLaser.laserVector = playersShip.vectorShip;
            newLaser.name = laserName;
            newLaser.lifeTime = 1000;
            newLaser.position.x = playersShip.position.x+newLaser.laserVector.x*(1+playersShip.acceleration.speed);
            newLaser.position.y = playersShip.position.y+newLaser.laserVector.y*(1+playersShip.acceleration.speed);
            newLaser.position.z = playersShip.position.z+newLaser.laserVector.z*(1+playersShip.acceleration.speed);

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
            playersShip.laserOverHeating()
            setTimeout(() => {
                scene.remove(newLaser)
                newLaser = null;
                delete laser.laserList[laserName]
            }, newLaser.lifeTime);
        }
    }

    function laserBehavior(scene){

        laser = {};
        laser.speed = 10;
        laser.laserList = {};

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

                enemyAI.starFightersObjectList.forEach(element => {
                    if (laserScene != undefined){
                        let distance = laserScene.position.distanceTo(element.position);
                        if (distance <=200){
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
                animateContainer()
            } else if (animationState == 'pause'){
                escapeWindowOpening()
            }
        requestAnimationFrame(animate)
    }

    function animateContainer(){
        if (playersShip.healthPoint<=1){
            playersShip.death.isDead()
        }
        enemyAI.starFightersObjectList.forEach(element => {
            element.reCompute(scene)
        });
        ailaser.laserRedraw()
        labelRenderer.render(scene, camera);
        fControls.update(1)
        playersShip.reCompute();
        renderer.render(scene,camera);
        laser.laserRedraw();

        // console.log('x:'+Math.round(playersShip.position.x) + '\n' + 'y:'+Math.round(playersShip.position.y) + '\n' + 'z:'+Math.round(playersShip.position.z) + '\n')
        // console.log(playersShip.healthPoint)

        if(gamePadUnit.gamepad.id){
            gamepadReactions(gamePadUnit.gamepad)
        }
        
    }

    function gamepadReactions(gamepad){
        if (gamepad.buttons[2].pressed){
            laserCreate(playersShip)
        }
        if (gamepad.buttons[7].pressed && !gamepad.buttons[6].pressed){
            playersShip.acceleration.destSpeed = playersShip.acceleration.maxSpeed;
        }
        if (gamepad.buttons[6].pressed && !gamepad.buttons[7].pressed){
            playersShip.acceleration.destSpeed = 0;
        }
        if (!gamepad.buttons[6].pressed && !gamepad.buttons[7].pressed){
            playersShip.acceleration.destSpeed = playersShip.acceleration.normalSpeed;
        }

    };
        
    function escapeWindowOpening(){
        TIEBlast.pause();
        document.getElementById('css2RenderText').classList.remove('hiddenCursor');
        let escapeWindow = document.getElementById('escapeWindow');
        escapeWindow.classList.remove('сlosedWindow');
        escapeWindow.addEventListener('click', function (event){
            if (!event.repeat) {
                switch (event.target.id){
                    // case 'btnOptionsEscape':console.log('Option window')

                    case 'btnLeaveBattleEscape':{
                        document.getElementById('health-bar').classList.add('closedWindow')
                        battleWindowControl.battleStop();
                        break;
                    }
                    case 'btnResumeBattleEscape':{
                        escapeWindow.classList.add('сlosedWindow');
                        document.getElementById('css2RenderText').classList.add('hiddenCursor');
                        battleWindowControl.battleResume();
                        break;
                    }
                }
            }
        })
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
                }
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
            }
        })
        
        labelRenderer.domElement.addEventListener('click', function(event){
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
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        labelRenderer.setSize( window.innerWidth, window.innerHeight );
    }
}

const battleWindowControl = {

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

export {battleInit, battleWindowControl, scene}