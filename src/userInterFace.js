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

    userInterfaceInit:function(){
        // let target = document.createElement('img');
        // target.src = './resource/interfaceRes/target.png';
        // target.classList = 'interfaceTarget';
        // target.id = 'interfaceTarget';
        // document.body.append(target)

        document.getElementById('health-bar').classList.remove('сlosedWindow')
    }
}
export{userInterFace}