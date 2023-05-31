import { THREE, TextGeometry, FontLoader, CSS2DRenderer,CSS2DObject} from "./three_libs_import.js";

const userInterFace = {
    textLoader: function(scene){
        
        // const loader = new FontLoader();

        // loader.load( 'https://cdn.skypack.dev/three@0.136/examples/fonts/optimer_regular.typeface.json', function ( font ) {
        //     const materials = [
        //         new THREE.MeshPhongMaterial( { color: 0x00ff00, flatShading: true } ), // front
        //         new THREE.MeshPhongMaterial( { color: 0x00 } ) // side
        //     ];
        //     const testingText = new TextGeometry( 'Hello three.js!', {
        //     font: font,
        //     size: 80,
        //     height: 5,
        //     curveSegments: 12,
        //     bevelEnabled: true,
        //     bevelThickness: 10,
        //     bevelSize: 8,
        //     bevelOffset: 0,
        //     bevelSegments: 5,
            
        //     } );
        //     const textMesh1 = new THREE.Mesh( testingText, materials )
        //     textMesh1.position.z = -2000
        //     textMesh1.position.x = -300
        //     textMesh1.position.y = -100
        //     textMesh1.rotation.y = 15/180*Math.PI
        //     scene.add(textMesh1)



        // } );

    },

    css2textLoader:function(scene, renderer, camera){
        // // let mWay = scene.getObjectByName('milkyway');
        // const earthMassDiv = document.createElement( 'div' );
        // earthMassDiv.className = 'label';
        // earthMassDiv.textContent = '5.97237e24 kg';
        // earthMassDiv.style.backgroundColor = 'transparent';

        // const earthMassLabel = new CSS2DObject( earthMassDiv );
        // earthMassLabel.position.set( 100, 0, 0 );
        // scene.add( earthMassLabel );
        // earthMassLabel.layers.set( 1 );
        // camera.position.z=100
        // renderer.render( scene, camera );

    }
        
}
export{userInterFace}