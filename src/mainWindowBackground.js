import {THREE, GLTFLoader} from './three_libs_import.js'
import {TextGeometry, FontLoader, CSS2DRenderer,CSS2DObject} from "./three_libs_import.js";
import{userInterFace}from './userInterFace.js'
import {options} from './options.js'
import {audioManager} from './audioManager.js'

let scene, camera, renderer, backgroundAnimations, backgroundMusic, milkyway, labelRenderer, moonLabel;
let timers = [];
let loader = new GLTFLoader();

function mainWindowBackgroundInit(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000000 );

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = 'mainBackgroundWindow';
    document.body.appendChild(renderer.domElement);

    // labelRenderer = new CSS2DRenderer();
    // labelRenderer.setSize( window.innerWidth, window.innerHeight );
    // labelRenderer.domElement.style.position = 'absolute';
    // labelRenderer.domElement.style.top = '0px';
    // labelRenderer.domElement.id = 'css2RenderText'
    // document.body.appendChild( labelRenderer.domElement );

    backgroundMusicInit()

    

    // userInterFace.textLoader(scene);
    // userInterFace.css2textLoader(scene, renderer, camera);  


    function backgroundMusicInit(){
        backgroundMusic = audioManager.audioList.backgroundMusic
        tryToPlayBackroundMusic()
        function tryToPlayBackroundMusic(){
            backgroundMusic.play().catch(error =>{
                setTimeout(() => {
                    tryToPlayBackroundMusic()
                }, 1000);
            })
        }

    }


    let hlight = new THREE.AmbientLight(0x808080, 3);
    scene.add(hlight);

    let light = new THREE.PointLight(0xc0c0c0,5);
    light.position.set(300000,200000, 30000);
    scene.add(light);

    loader.load('resource/3DModels/starsBackground/scene.gltf', function(gltf){
        milkyway = gltf.scene
        milkyway.scale.set(1000000,1000000,1000000);
        milkyway.name = 'milkyway';
        scene.add(gltf.scene);
    });

    loader.load('resource/3DModels/tatooine/scene.gltf', function(gltf){
        let tatooine = gltf.scene
        tatooine.scale.set(100000,100000,100000);
        tatooine.name = 'tatooine_planet';
        scene.add(gltf.scene);
        tatooine.position.x = 25000;
        tatooine.position.y = -115000;
        tatooine.position.z = -50000;
        tatooine.rotation.z = 285/180*Math.PI

    });

    loader.load('resource/3DModels/MonCalamaryFlagman/scene.gltf', function(gltf){
        let mon_calamari = gltf.scene
        mon_calamari.scale.set(30,30,30);
        mon_calamari.name = 'Mon_Calamary';
        scene.add(gltf.scene);
        mon_calamari.rotation.y = 90/180*Math.PI;
        mon_calamari.position.x = -5000;
        mon_calamari.position.y = -400;
        mon_calamari.position.z = -90000;
    });

    loader.load('resource/3DModels/nebulon_b_frigate/scene.gltf', function(gltf){
        animationstart()
    });    

    function animationstart(){
        backgroundAnimations = {
            working:true,
            starfighterList:{},
            frigateList:{},
    
            starfightersPathArray:['resource/3DModels/X-Wing/scene.gltf','resource/3DModels/A-Wing/scene.gltf','resource/3DModels/Y-Wing/scene.gltf'],
    
            frigatesPathArray:['resource/3DModels/nebulon_b_frigate/scene.gltf'], //, 'resource/3DModels/cr90_corvette/scene.gltf'
    
            frigateSpawnPointsCoordinates:{
                point1:{x:15000,y:9000},
                point2:{x:-15000,y:11000},
                point3:{x:10000,y:10000},
                point4:{x:-10000,y:10000},
                point5:{x:5000,y:12000},
                point6:{x:-3000,y:12000},
                point7:{x:15000,y:-8000},
                point8:{x:-15000,y:-8000},
                point9:{x:10000,y:-10000},
                point10:{x:-10000,y:-10000},
                point11:{x:5000,y:-12000},
                point12:{x:-3000,y:-12000},
            },
    
    
            starfighterSpawning : function(scene){
                let timerID = `starfighterSpawningTask_${Date.now()}`
                timerID = setInterval(() => {
                    if (Object.keys(backgroundAnimations.starfighterList).length<10){
                        let modelPath = this.starfightersPathArray[Math.round(Math.random()*(this.starfightersPathArray.length-1))];
                        let starfighterID = `starfighter_${Date.now()}`
        
                        loader.load(modelPath, function(gltf){
                            let starfighter = gltf.scene
                            starfighter.scale.set(20,20,20);
                            starfighter.name = starfighterID;
                            scene.add(gltf.scene);
                            modelPath=='resource/3DModels/X-Wing/scene.gltf'?starfighter.rotation.y = 180/180*Math.PI:starfighter.rotation.y = 0/180*Math.PI;
        
                            starfighter.position.x = 0;
                            starfighter.position.y = 0;
                            starfighter.position.z = -20000;
                            starfighter.accelerationX = (Math.random()+0.2)*2-1.2;
                            starfighter.accelerationY = (Math.random()+0.2)*2-1.2;
                            
                            backgroundAnimations.starfighterList[starfighterID] = starfighter;

                            const moonDiv = document.createElement( 'div' );
                            moonDiv.style.zIndex = -1;
                            moonDiv.className = 'css2Text';
                            // moonDiv.textContent = '¤';
                            moonDiv.style.backgroundColor = 'transparent';
                    
                            moonLabel = new CSS2DObject( moonDiv );
                            moonLabel.position.set( 0, 0, 0 );
                            moonLabel.name = 'testing_text1'
                            starfighter.add( moonLabel );
                        });
                    }
                },3000);
                timers.push(timerID)
            },
    
            starFrigateSpawning : function(scene){
      
    
                    let timerID = `starfighterSpawningTask_${Date.now()}`
                    timerID = setInterval(() => {
                        if (Object.keys(backgroundAnimations.frigateList).length<10){
                            let modelPath = this.frigatesPathArray[Math.round(Math.random()*(this.frigatesPathArray.length-1))];
                            let frigateID = `frigate_${Date.now()}`
    
                            loader.load(modelPath, function(gltf){
                                let frigate = gltf.scene
                                frigate.scale.set(20,20,20);
                                frigate.name = frigateID;
                                scene.add(gltf.scene); 
                                                
                                const spawnPointKeys = Object.keys(backgroundAnimations.frigateSpawnPointsCoordinates);
    
                                const spawnPoint = spawnPointKeys[Math.round(Math.random()*(spawnPointKeys.length-1))]
    
                                modelPath=='resource/3DModels/cr90_corvette/scene.gltf'?frigate.rotation.y = 180/180*Math.PI:frigate.rotation.y = 0/180*Math.PI;
    
                                frigate.position.x = backgroundAnimations.frigateSpawnPointsCoordinates[spawnPoint].x;
    
                                frigate.position.y = backgroundAnimations.frigateSpawnPointsCoordinates[spawnPoint].y;
    
                                frigate.position.z = -200000;
                                
                                backgroundAnimations.frigateList[frigateID] = frigate;

                                // const moonDiv = document.createElement( 'div' );
                                // moonDiv.style.zIndex = -1;
                                // moonDiv.className = 'css2Text';
                                // moonDiv.textContent = '¤';
                                // moonDiv.style.backgroundColor = 'transparent';
                        
                                // moonLabel = new CSS2DObject( moonDiv );
                                // moonLabel.position.set( 0, 0, 0 );
                                // moonLabel.name = 'testing_text1'
                                // frigate.add( moonLabel );
                            });
                        }
                    },5000);
                    timers.push(timerID)
            },
    
            redrawing: function(scene){
                let planet = scene.getObjectByName('tatooine_planet',true);
                if(planet){
                    planet.rotation.y +=0.0001;
                    planet.rotation.x +=0.0002;
                }
    
                Object.keys(backgroundAnimations.starfighterList).forEach(element => {
                    const starfighter = backgroundAnimations.starfighterList[element];
    
                    starfighter.position.z +=30;
    
                    starfighter.position.x +=starfighter.accelerationX;
    
                    starfighter.position.y +=starfighter.accelerationY;
    
                    if (starfighter.position.z>1000){
                        let starfighterModel = scene.getObjectByName(element,true)
                        scene.remove(starfighterModel)
                        delete backgroundAnimations.starfighterList[element]
                        starfighterModel = null;
                    }
                });
    
                Object.keys(backgroundAnimations.frigateList).forEach(element => {
                    const frigate = backgroundAnimations.frigateList[element];
                    if (frigate.position.z<-100000){
                        frigate.position.z+=10000
                    }else{
                        frigate.position.z+=100
                    }
                    if (frigate.position.z>1000){
                        let frigateModel = scene.getObjectByName(element,true)
                        scene.remove(frigateModel)
                        delete backgroundAnimations.frigateList[element]
                        frigateModel = null;
                    }
    
                });
            },
        };
    
        backgroundAnimations.starfighterSpawning(scene);
        backgroundAnimations.starFrigateSpawning(scene);
        animate()

        function animate(){
            if (backgroundAnimations.working){
                backgroundAnimations.redrawing(scene);
                renderer.render(scene,camera);
                // labelRenderer.render(scene, camera);
                requestAnimationFrame(animate); 


            }
        };
    }


    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
}

function backgroundRemove(){
    backgroundMusic.pause();

    document.getElementById('css2RenderText')?document.getElementById('css2RenderText').remove():false;
    backgroundAnimations.working = false;
    timers.forEach(timer => {
        clearTimeout(timer)
    });
    let canv = document.getElementById('mainBackgroundWindow');
    canv.remove()
    canv = null

    scene, camera, renderer, backgroundAnimations, timers, backgroundMusic = null
}
export {mainWindowBackgroundInit, backgroundRemove}