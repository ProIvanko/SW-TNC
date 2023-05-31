import {THREE, GLTFLoader} from './three_libs_import.js'
function environmentInit(scene, loader){
    let hlight = new THREE.AmbientLight(0x808080, 2);
    scene.add(hlight);

    let light = new THREE.PointLight(0xc0c0c0,5);
    light.position.set(300000,200000, 30000);
    scene.add(light);

    loader.load('resource/3DModels/starsBackground/scene.gltf', function(gltf){
        let milkyway = gltf.scene
        milkyway.scale.set(1000000,1000000,1000000);
        milkyway.name = 'milkyway';
        scene.add(gltf.scene);
    });

    loader.load('resource/3DModels/tatooine/scene.gltf', function(gltf){
        let tatooine = gltf.scene
        tatooine.scale.set(1000000,1000000,1000000);
        tatooine.name = 'tatooine_planet';
        scene.add(gltf.scene);
        tatooine.position.x = 1000;
        tatooine.position.y = -1400000;
        tatooine.position.z = 1000;
        tatooine.rotation.z = 285/180*Math.PI
    });

    // hlight = new THREE.AmbientLight(0x808080, 2);
    // scene.add(hlight);

    // directionalLight = new THREE.DirectionalLight(0xffffff,10);
    // directionalLight.position.set(20000,-20000,20000);
    // directionalLight.castShadow = true;
    // scene.add(directionalLight);

    // light = new THREE.PointLight(0xc0c0c0,5);
    // light.position.set(300000,200000, 30000);
    // scene.add(light);

    // light2 = new THREE.PointLight(0xc4c4c4,5);
    // light2.position.set(500,100,0);
    // scene.add(light2);

    // light3 = new THREE.PointLight(0xc4c4c4,5);
    // light3.position.set(0,100,-500);
    // scene.add(light3);

    // light4 = new THREE.PointLight(0xc4c4c4,5);
    // light4.position.set(-500,300,0);
    // scene.add(light4);
    console.log('environminetInitialised')
}

export{environmentInit}