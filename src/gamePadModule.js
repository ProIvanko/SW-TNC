
const gamePadUnit = {
    gamepad:{},
    gamepadInit : function(){
        let gamepadInfo
        let start;

        let rAF = window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.requestAnimationFrame;

        let rAFStop = window.mozCancelRequestAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.cancelRequestAnimationFrame;

        window.addEventListener("gamepadconnected", function() {
            let gp = navigator.getGamepads()[0];
        gamepadInfo = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
        gameLoop();
        });

        window.addEventListener("gamepaddisconnected", function() {
        gamepadInfo = "Waiting for gamepad.";
        rAFStop(start);
        });

        if(!('GamepadEvent' in window)) {
        let interval = setInterval(pollGamepads, 500);
        }

        function pollGamepads() {
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        for (let i = 0; i < gamepads.length; i++) {
            let gp = gamepads[i];
            if(gp) {
            gamepadInfo = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
            gameLoop();
            clearInterval(interval);
            }
        }
        }

        function gameLoop() {
            let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
            
        if (!gamepads)
            return;
            gamePadUnit.gamepad = gamepads[0];
        let start = rAF(gameLoop);
        };
    }
}

export{gamePadUnit}