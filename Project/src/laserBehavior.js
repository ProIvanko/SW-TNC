// const laserBehavior = {
//     laserOnFieldList:{},

//     laserMaterial: new THREE.MeshBasicMaterial( { 
//             color: 0x00FF00,
//             opacity:0.9,
//             transparent: true,
//             emissive:0x00FF00,  
//             emissiveIntensity: 1,
//     }),

//     laserGeometry: new THREE.CylinderGeometry( .5, .5 ,10, 32),

//         laserID :function(){return `laser_${Date.now()}`},

//     laserCreate: function(scene, starfighter) {
//         let laserID = this.laserID();
//         laserID = new THREE.Mesh(this.laserGeometry, this.laserMaterial);
//         laserID.position.x = starfighter.position.x
//         laserID.position.y = starfighter.position.y
//         laserID.position.z = starfighter.position.z
//         laserID.rotation.x = starfighter.rotation.x
//         laserID.rotation.y = starfighter.rotation.y
//         laserID.rotation.z = starfighter.rotation.z
//         laserID.vectorLaser = starfighter.acceleration.vectorShip
//         laserID.rotation.x +=90/180*Math.PI;
//         scene.add(laserID);
//         return this.laserID;
//     },
// }