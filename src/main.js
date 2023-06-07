//import {THREE, GLTFLoader, OrbitControls} from './three_libs_import.js';
import {battleInit, battleWindowControl} from './battleModule.js'
//import { BufferGeometryLoader } from 'three';
import {mainContainer} from './mainContainerInit.js';
import {mainWindowBackgroundInit, backgroundRemove} from './mainWindowBackground.js'
import {userDataStorage, currentUserData} from './userDataStorage.js'
import {gamePadUnit} from './gamePadModule.js'
import {options} from './options.js'
import {audioManager} from './audioManager.js'

userDataStorage.firebaseInit()

// function MVCModule(){
// /* ------- begin view -------- */
// function ModuleView() {
//     let myModuleContainer = null;

//     this.init = function(container) {
//     myModuleContainer = container;
//     }
// }
// /* -------- end view --------- */
// /* ------- begin model ------- */
// function ModuleModel () {
//     let myModuleView = null;

//     this.init = function(view) {
//         myModuleView = view;
//     }
// }
// /* -------- end model -------- */

// /* ----- begin controller ---- */
// function ModuleController () {
//     let myModuleContainer = null;
//     let myModuleModel = null;

//     this.init = function(container, model) {
//         myModuleContainer = container;
//         myModuleModel = model;
//     }
// };
// /* ------ end controller ----- */
// }

function tryToEnter(){
    const login = document.getElementById('formInputLogin').value.toLowerCase().trim();
    const password = document.getElementById('formInputPassword').value;
    const userKeys = userDataStorage.getUserKeys();
    const loginField = document.getElementById('formInputLogin');
    const passwordField = document.getElementById('formInputPassword');

    if (Object.keys(userKeys).includes(login)) {
        if (userKeys[login]==password){
            // loginField.value = '';
            // passwordField.value = '';
            const userData = userDataStorage.userData[login.toLowerCase()]
            currentUserData.currentUserInit(userData);
            helloUserWindow()
        } else {
            passwordField.value = '';
            passwordField.placeholder = 'Неверный пароль';
            passwordField.classList.add('formWrong');
            passwordField.focus();
            setTimeout(() => {
                passwordField.placeholder = 'Пароль';
                passwordField.classList.remove('formWrong');
            }, 2000);
        }
    } else {
        loginField.value = '';
        loginField.placeholder = 'Неверный логин';
        loginField.classList.add('formWrong');

        setTimeout(() => {
            loginField.placeholder = 'Логин';
            loginField.classList.remove('formWrong');
        }, 2000);
        loginField.focus();
        passwordField.value = '';
    }
}

function tryToRegister(){
    const userSide = rebelPic.classList.contains('pickedSidePic')?'rebel':'empire';
    const loginField =  document.getElementById('registrationLogin')
    const passwordField = document.getElementById('registrationPassword')
    const passwordConfirmField = document.getElementById('registrationPasswordConfirm')
    const userKeys = userDataStorage.getUserKeys();

    function loginCheck(){
        if ((Object.keys(userKeys).includes(loginField.value.toLowerCase().trim()))||(loginField.value.trim().length<3)) {
            loginField.placeholder = (loginField.value.trim().length<3)?'Слишком короткий логин':'Логин существует';
            loginField.value = '';
            loginField.classList.add('formWrong');
            setTimeout(() => {
                loginField.placeholder = 'Логин';
                loginField.classList.remove('formWrong');
            }, 2000);
            loginField.focus();
            passwordField.value, passwordField.value = '';
            return false
        } else{
            return true
        }
    };

    function passwordCheck(){
        if((passwordField.value.length<4)||(passwordField.value!=passwordConfirmField.value)){
            passwordField.placeholder = (passwordField.value.length<4)?'Слишком короткий пароль':'Пароли не совпадают';
            passwordField.value = '';
            passwordConfirmField.value = '';
            passwordField.classList.add('formWrong');
            setTimeout(() => {
                passwordField.placeholder = 'Пароль';
                passwordField.classList.remove('formWrong');
            }, 2000);
            passwordField.focus();
            return false
        } else {
            return true
        }
    };

    userDataCheck()

    function userDataCheck(){
        if(loginCheck()&&passwordCheck()){
            userDataStorage.userAdd(loginField.value, passwordField.value, userSide);
            userDataStorage.userDataSendToStorage();
            loginField.value, passwordField.value.trim(), passwordConfirmField.value = ''
            loginWindowOpening()
        }
    };

};

function loginWindowOpening(){
    registrationWindow.classList.add('сlosedWindow');
    loginWindow.classList.remove('сlosedWindow');
}

function registrationWindowOpening(){
    loginWindow.classList.add('сlosedWindow');
    registrationWindow.classList.remove('сlosedWindow');
}

function helloUserWindow(){
    const backgroundVideoPath = '';
    const choosedSide = currentUserData.userSide;
    overlayWindow.classList.add('overlayWindowSolid');
    welcomeWindow.classList.remove('сlosedWindow')

    hangarUserLogin.innerHTML = currentUserData.userLogin
    hangarStatisticsContent.innerHTML = currentUserData.parsedUserStatistics;

    welcomeWindowLogin.innerText = currentUserData.userLogin
    choosedSide=='empire'?welcomePic.src = 'resource/pageMedia/empireLogo.png':welcomePic.src = 'resource/pageMedia/rebelLogo.png'

    setTimeout(() => {

        welcomeWindow.classList.remove('welcomeWindowHidden');
        setTimeout(() => {
            document.getElementById('mainBackgroundWindow')?backgroundRemove():false;
            welcomePic.classList.remove('welcomeWindowHidden');
            setTimeout(() => {
                welcomeWindow.classList.add('welcomeWindowHidden', 'сlosedWindow');
                hangarWindowOpening();
            }, 1000);
        }, 500);
    }, 500);



    // hangarWindowOpening()
}

function hangarWindowOpening() {
    const backgroundVideoPath = '';
    const choosedSide = currentUserData.userSide;
    overlayWindow.classList.add('overlayWindowSolid');
    setTimeout(() => {

        escapeWindow.classList.add('сlosedWindow');

        document.getElementById('battleWindow')?document.getElementById('battleWindow').style.display = 'none':false;

        document.getElementById('mainBackgroundWindow')?backgroundRemove():false;
        if(choosedSide=='empire'){
            hangarUserInfo.classList.add('hangarPageEmpire')
            hangarMenu.classList.add('hangarPageEmpire')
        } else {
            hangarUserInfo.classList.add('hangarPageRebel')
            hangarMenu.classList.add('hangarPageRebel')
        }

        const videoElement = document.getElementById('backgroundVideo');
        if (choosedSide=='empire'){
            videoElement.innerHTML = 
            `<source src="resource/pageMedia/empire-background.mp4" type="video/mp4">`
        } else {
            document.querySelector("link[rel*='icon']").href = "resource/pageMedia/rebelLogo.png";
            videoElement.innerHTML = 
            `<source src="resource/pageMedia/rebel-background.mp4" type="video/mp4">`
        }
        
        hangarPage.classList.remove('сlosedWindow');

        mainPage.classList.add('сlosedWindow');

        overlayWindow.classList.remove('overlayWindowSolid')

    }, 950);
}

function registerSideChange(event){
    if (event.target.id=='rebelPic') {
        event.target.classList.add('pickedSidePic')
        empirePic.classList.remove('pickedSidePic')
        document.querySelector("link[rel*='icon']").href = "resource/pageMedia/rebelLogo.png";
    }
    if (event.target.id=='empirePic') {
        event.target.classList.add('pickedSidePic')
        rebelPic.classList.remove('pickedSidePic')
        document.querySelector("link[rel*='icon']").href = "resource/pageMedia/empireLogo.png";
    }
}

function optionWindowOpening(){
    document.getElementById('optionsWindow').classList.remove('сlosedWindow');
    document.getElementById('overlayWindow').classList.add('overlayWindowOption');
}

function optionWindowClosing(){
    document.getElementById('optionsWindow').classList.add('сlosedWindow');
    document.getElementById('overlayWindow').classList.remove('overlayWindowOption');
}

function listenersInit(){

    options.optionListenersInit();

    sideChoosingDiv.addEventListener('click',function(event){
        registerSideChange(event)
    });
    
    registrationUserBtn.addEventListener('click',function(){
        tryToRegister()
    })
    
    btnBack.addEventListener('click',function(){
        loginWindowOpening()
    })

    btnStartBattle.addEventListener('click', function(){
        overlayWindow.classList.add('overlayWindowSolid');
    
        setTimeout(() => {
            
            hangarPage.classList.add('сlosedWindow');
    
            overlayWindow.classList.remove('overlayWindowSolid')
            setTimeout(() => {
                if (document.getElementById('battleWindow')){
                    escapeWindow.classList.remove('сlosedWindow');
                    document.getElementById('battleWindow').style.display = 'block'
                }else {battleInit()}

            }, 500);
        }, 950);
    })

    formBtnEnter.addEventListener('click',function(){
        tryToEnter()
    })
    
    document.addEventListener('keydown',(event)=>{
        if (event.key === 'Enter'&& (!(mainPage.classList.value.split(' ').includes('сlosedWindow')))) {
            tryToEnter()
        }
    })

    btnRegister.addEventListener('click', function (){
        registrationWindowOpening();
    })
    
    btnLeaveBattleEscape.addEventListener('click', function (){  
        btnStartBattle.innerText = 'Продолжить бой'
        hangarWindowOpening();
    })
    addEventListener('submit',function(event){
        event.preventDefault()
    })

    window.onresize = function(){isMobileMod()}

    window.addEventListener("load", function(){
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            console.log('Вы используете мобильное устройство')
          } else {
            console.log('Вы используете PC либо MAC')
        }
        isMobileMod()
    })

    function isMobileMod(){
        if(window.innerHeight<=550){
            // mainMenuName1.classList.add('mobileMod');
            // mainMenuName2.classList.add('mobileMod');
            mainMenuName.classList.add('mobileMod');
        } else {
            // mainMenuName1.classList.remove('mobileMod');
            // mainMenuName2.classList.remove('mobileMod');
            mainMenuName.classList.remove('mobileMod');
        }
    }

    document.getElementById('btnOptionsClose').addEventListener('click', function(){
        optionWindowClosing()
    });

    document.getElementById('btnOptions').addEventListener('click', function(){
        optionWindowOpening()
    })

    document.getElementById('btnOptionsEscape').addEventListener('click', function(){
        optionWindowOpening()
    })

    document.getElementById('btnOptionsMainWindow').addEventListener('click', function(){
        optionWindowOpening()
    })
}

audioManager.audioInit()

mainContainer.mainContainerInit();

listenersInit();

mainWindowBackgroundInit()

gamePadUnit.gamepadInit();

// setTimeout(() => {
//     helloUserWindow()
//     setTimeout(() => {
//         overlayWindow.classList.add('overlayWindowSolid');
    
//         setTimeout(() => {
            
//             hangarPage.classList.add('сlosedWindow');
    
//             overlayWindow.classList.remove('overlayWindowSolid')
//             setTimeout(() => {
//                 if (document.getElementById('battleWindow')){
//                     escapeWindow.classList.remove('сlosedWindow');
//                     document.getElementById('battleWindow').style.display = 'block'
//                 }else {battleInit()}

//             }, 500);
//         }, 950);
//     }, 2500);
// }, 500);
