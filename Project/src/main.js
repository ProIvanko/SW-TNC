//import {THREE, GLTFLoader, OrbitControls} from './three_libs_import.js';
import {battleInit} from './battleModule.js'
//import { BufferGeometryLoader } from 'three';
import { loginWindow } from './loginWindow.js';
import {mainWindowBackgroundInit, backgroundRemove} from './mainWindowBackground.js'

//battleInit()
mainWindowBackgroundInit()
//start SPA module
    // ---View---
    const View = {

    }
    //---View End---
    //---Model---
    const Model = {

    }
    //---Model End---
    //---Controller---
    const Controller = {

    }
    //---Controller End---
//End SPA module


    //localstorage
    const userDataStorage = {
        userData:{},

        userAdd : function (userLogin, userPassword, userEmail, userSide) {
            // const userID = userLogin.toLowerCase() + '_' + Date.now();
            const userID = userLogin.toLowerCase();
            this.userData[userID] = {userLogin, userPassword, userEmail, userSide
            }

            this.userData[userID].statistics = {
                rebel : {
                    wins:0,
                    games: 0,
                    inflictedDamage: 0,
                    inflictedDamageToFlagman: 0,
                    deaths: 0,
                    userStats: function(){
                        const outputString = `Игр сыграно: ${this.games}Побед: ${this.wins}
                        Нанесено урона: ${this.inflictedDamage}
                        Нанесено урона флагману: ${this.inflictedDamageToFlagman}
                        Смертей: ${this.deaths}`
                        return outputString
                    }
                },
                empire : {
                    wins:0,
                    games: 0,
                    inflictedDamage: 0,
                    inflictedDamageToFlagman: 0,
                    deaths: 0,
                    userStats: function(){
                        const outputString = `Игр сыграно: ${this.games}Побед: ${this.wins}
                        Нанесено урона: ${this.inflictedDamage}
                        Нанесено урона флагману: ${this.inflictedDamageToFlagman}
                        Смертей: ${this.deaths}`
                        return outputString
                    }
                },
            },
            this.userDataSendToLocalStorage();
        },

        userDataSendToLocalStorage : function(){
            localStorage.setItem ('SWUserData', JSON.stringify(this.userData))
        },

        getUserKeys: function() {
            const keysLoginPassword = {};
            Object.keys(this.userData).forEach(element => {
                keysLoginPassword[this.userData[element].userLogin.toLowerCase()] = this.userData[element].userPassword;

            });
            return keysLoginPassword;
        }
    };

    const currentUserData = {
        currentUserID: '',
        // addStatistics : function(side, wins, games, inflictedDamage, inflictedDamageToFlagman, deaths) {
        //             this[side].wins++;
        //             this[side].games++;
        //             this[side].inflictedDamage++;
        //             this[side].inflictedDamageToFlagman++;
        //             this[side].deaths++;
        //         }
    }

    if (!localStorage.SWUserData) {
        userDataStorage.userDataSendToLocalStorage()
    } else {
        userDataStorage.userData = JSON.parse(localStorage.getItem('SWUserData'))
    }

    userDataStorage.userAdd('Ivanko', '1243', 'ivanko1243@mail.ru', 'rebel');
    userDataStorage.userAdd('Emily', '5678', 'emily1243@mail.ru', 'empire')
    // console.log(userDataStorage.getUserKeys())
    // console.log(userDataStorage.userData.ivanko.userLogin)

    btnRegister.addEventListener('click', function (){
        console.log('registerWindow')
    })


    const tryToEnter = function(){
        const login = document.getElementById('formInputLogin').value.toLowerCase();
        const password = document.getElementById('formInputPassword').value;
        const userKeys = userDataStorage.getUserKeys();

        if (Object.keys(userKeys).includes(login)) {
            console.log('Login exist')
            if (userKeys[login]==password){
                document.getElementById('formInputLogin').value = '';
                document.getElementById('formInputPassword').value = '';
                hangarWindowOpening();
            } else {
                document.getElementById('formInputPassword').value = '';
                document.getElementById('formInputPassword').placeholder = 'Неверный пароль';
                document.getElementById('formInputPassword').classList.add('formWrong');
                document.getElementById('formInputPassword').focus();
                setTimeout(() => {
                    document.getElementById('formInputPassword').placeholder = 'Пароль';
                    document.getElementById('formInputPassword').classList.remove('formWrong');
                }, 2000);
            }
        } else {
            document.getElementById('formInputLogin').value = '';
            document.getElementById('formInputLogin').placeholder = 'Неверный логин';
            document.getElementById('formInputLogin').classList.add('formWrong');

            setTimeout(() => {
                document.getElementById('formInputLogin').placeholder = 'Логин';
                document.getElementById('formInputLogin').classList.remove('formWrong');
            }, 2000);

            document.getElementById('formInputLogin').focus();
            document.getElementById('formInputPassword').value = '';
        }
    }
    
    formBtnEnter.addEventListener('click',function(){
        tryToEnter()
    })


    document.addEventListener('keydown',(event)=>{
        if (event.key === 'Enter'&& (!(document.getElementById('mainPage').classList.value.split(' ').includes('сlosedWindow')))) {
            tryToEnter()
        }
    })



    function hangarWindowOpening() {
        const backgroundVideoPath = '';
        const choosedSide = 'empire';
        document.getElementById('overlayWindow').classList.add('overlayWindowSolid');

        setTimeout(() => {
            backgroundRemove();
            const videoElement = document.getElementById('backgroundVideo');
            console.log(choosedSide)
            if (choosedSide=='empire'){
                console.log('empire')
                videoElement.innerHTML = 
                `<source src="resource\\pageMedia\\empire-background.mp4" type="video/mp4">`
                console.log(videoElement)
            } else {
                console.log('rebel')
                videoElement.innerHTML = 
                `<source src="resource\\pageMedia\\rebel-background.mp4" type="video/mp4">`
                console.log(videoElement)
            }
            
            document.getElementById('hangarPage').classList.remove('сlosedWindow');

            document.getElementById('mainPage').classList.add('сlosedWindow');

            document.getElementById('overlayWindow').classList.remove('overlayWindowSolid')

        }, 950);
    }

    btnStartBattle.addEventListener('click', function(){
        document.getElementById('overlayWindow').classList.add('overlayWindowSolid');

        setTimeout(() => {
            
            document.getElementById('hangarPage').classList.add('сlosedWindow');

            document.getElementById('overlayWindow').classList.remove('overlayWindowSolid')
            console.log('Loading...')
            setTimeout(() => {
                battleInit()
            }, 500);
        }, 950);
    })


    // setTimeout(() => {
    //     hangarWindowOpening()
    // }, 200);


    // document.getElementById('mainPage').classList.add('сlosedWindow');

    // document.getElementById('overlayWindow').classList.remove('overlayWindowSolid')
    // setTimeout(() => {
    //     battleInit()
    // }, 500);

    // setTimeout(() => {
    //     backgroundRemove();
    //     console.log('removed')
    // }, 5000);



