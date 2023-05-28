function battleControls(camera, renderer, window){
    // addEventListener('keydown',function(event){
    //     if (!event.repeat) {
    //         let shipAcc = playersShip.acceleration;
    
    //         event.preventDefault()
    //         switch (event.key) {
    //             case ('w'): {
    //                 shipAcc.destSpeed = shipAcc.maxSpeed;
    //                 break
    //             }
    //             case ('s'): {
    //                 shipAcc.destSpeed = 0;  
    //                 break
    //             }
    //             case ('a'): {
    //                 shipAcc.rotAccelerationY += 1/180*Math.PI;    
    //                 break
    //             }
    //             case ('d'): {
    //                 shipAcc.rotAccelerationY -= 1/180*Math.PI;    
    //                 break
    //             }
    //             case ('e'): {
    //                 shipAcc.rotAccelerationZ += 2/180*Math.PI;    
    //                 break
    //             }
    //             case ('q'): {
    //                 shipAcc.rotAccelerationZ -= 2/180*Math.PI;    
    //                 break
    //             }
    //             case ('z'): {
    //                 shipAcc.accelerationY = 100;       
    //                 break
    //             }
    //             case ('c'): {
    //                 shipAcc.accelerationY = -100;   
    //                 break
    //             }
    //             case ('space'): {
    //                 console.log('SpaceBar') 
    //                 break
    //             }
    //         }
    //     }
    // })
    
    // addEventListener('keyup',function(event){
    //     event.preventDefault()
    //     let shipAcc = playersShip.acceleration;
    //     switch (event.key) {
    //         case ('w'): {
    //             shipAcc.destSpeed = shipAcc.normalSpeed;
    //             break
    //         }
    //         case ('s'): {
    //             shipAcc.destSpeed = shipAcc.normalSpeed;
    //             break
    //         }
    //         case ('a'): {
    //             shipAcc.rotAccelerationY = 0;    
    //             break
    //         }
    //         case ('d'): {
    //             shipAcc.rotAccelerationY = 0;    
    //             break
    //         }
    //         case ('e'): {
    //             shipAcc.rotAccelerationZ = 0;    
    //             break
    //         }
    //         case ('q'): {
    //             shipAcc.rotAccelerationZ = 0;    
    //             break
    //         }
    //         case ('z'): {
    //             // shipAcc.rotAccelerationX = 0/180*Math.PI;   
    //             shipAcc.accelerationY = 0;    
    //             break
    //         }
    //         case ('c'): {
    //             // shipAcc.rotAccelerationX = 0/180*Math.PI;    
    //             shipAcc.accelerationY = 0;    
    //             break
    //         }
    //     }
    // })
    
    // window.addEventListener( 'resize', onWindowResize, false );
    
    // function onWindowResize(){
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize( window.innerWidth, window.innerHeight );
    // }
    // window.addEventListener( 'resize', onWindowResize, false );

    // function onWindowResize(){
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize( window.innerWidth, window.innerHeight );
    // }
    console.log('controls inited')
}

export {battleControls}

