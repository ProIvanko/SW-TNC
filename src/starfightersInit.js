import {THREE, GLTFLoader} from './three_libs_import.js'

function starfightersInit(scene, loader){
    console.log('star fighters inited')
    
    let AWingModel, YWingModel, XWingModel, TIEFModel, TIEBModel, TIEDModel;

    function loadersInit(){
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

        for (let i=1; i<=10; i++){
            loader.load('resource/3DModels/A-Wing/scene.gltf', function(AWing){
                AWingModel = AWing.scene
                AWingModel.scale.set(10,10,10);
                AWingModel.name = 'A-Wing';
                AWingModel.type = `starfighter${i}`
                let AWing01 = AWingModel;
                scene.add(AWing01);
                AWing01.position.z = i*500;
    
                // const AWingShieldGeometry = new THREE.SphereGeometry( 5, 32, 16 );
                // const AWingShieldMaterial = new THREE.MeshBasicMaterial( { color: 0x00FFFF,
                // opacity:0.1,
                // transparent: true
                //  }); 
                // const AWingShield = new THREE.Mesh(AWingShieldGeometry, AWingShieldMaterial);
                // scene.add(AWingShield)
    
                // AWing01.attach(AWingShield)
                // starfightersInit()   
            });
        };
        
    }

    function starfightersInit(){
        // let AWing01 = AWingModel;
        // scene.add(AWing01);
    }

    loadersInit()
}


export {starfightersInit}