const mainContainer = {
    innerHTML : `
    <div id="mainPage" class="mainPage">
    <div class="mainMenuName" id = 'mainMenuName'>
        <h1 id = 'mainMenuName1' class="mainMenuName1"> Star Wars</h1>
        <h2 id = 'mainMenuName2' class="mainMenuName2">The new code</h2>
    </div>
    <div id ='loginWindow' class="loginWindow">

        <div class="mainWindowContent">
            
            <div class="formLogin">
                <input
                    id="formInputLogin"
                    class="formInputLogin formElement formInput"
                    type="text" 
                    minlength="3" 
                    maxlength="12" 
                    placeholder="Логин" 
                    required
                >
    
                <input
                    id="formInputPassword"
                    class="formInputPassword formElement formInput"
                    type="password" 
                    minlength="4" 
                    maxlength="16" 
                    placeholder="Пароль" 
                    required
                >
            </div>
    
            <button 
                class="formBtnEnter loginBtn formElement" 
                id="formBtnEnter" 
                
            >Войти</button>
        
            <button
                class="btnRegister registrationBtn formElement" 
                id="btnRegister" 
            >Регистрация</button>
            <button
                class="btnOptionsMainWindow formElement" 
                id="btnOptionsMainWindow" 
            >Настройки</button>
        </div>
        <div class="backgroundOpacity"></div>

    </div>
    
    <div id="registrationWindow" class="registrationWindow сlosedWindow">
        <div>
            <div class="registrationLogin">
                <input
                    class="registrationLogin formElement"
                    id="registrationLogin"
                    type="text" 
                    minlength="3" 
                    maxlength="12" 
                    placeholder="Логин" 
                >
    
                <input
                    class="registrationPassword formElement"
                    id="registrationPassword"
                    type="password"
                    minlength="6" 
                    maxlength="50" 
                    placeholder="Пароль" 
                >
    
                <input
                class="registrationPassword formElement"
                id="registrationPasswordConfirm"
                type="password" 
                minlength="6" 
                maxlength="50" 
                placeholder="Подтвердите пароль" 
            >
                <div class="sideChoosingDiv" id="sideChoosingDiv">
                    <img class="rebelPic sidePic" 
                    id="rebelPic"
                    src="resource/pageMedia/rebelLogo.png" alt="Rebel" >
                    <img id="empirePic" class="empirePic sidePic pickedSidePic" src="resource/pageMedia/empireLogo.png" alt="Empire" >
                </div>
    
                
                <button 
                    class="registrationUserBtn btnRegister" 
                    id="registrationUserBtn" 
                    
                >Зарегистрировать</button>
                <button
                    class="btnBack  formElement" 
                    id="btnBack" 
                >Назад</button>
                
            </div>
        </div>
    </div>
    
</div>

<div class="overlayWindowOpaque" id="overlayWindow">
</div>

    <div id="welcomeWindow" class="welcomeWindow welcomeWindowHidden сlosedWindow">
        <h3>Welcome</h1>
        <h1 id="welcomeWindowLogin">Mr. Smith</h2>
        <img class="welcomePic welcomeWindowHidden" 
        id="welcomePic"
        src="resource/pageMedia/empireLogo.png" alt="welcomePic" >
    </div>
    
    <div id="hangarPage" class="hangarPage сlosedWindow hangarEmpire">
        <video 
        id="backgroundVideo" 
        autoplay 
        loop 
        muted>
        </video>

        <div id="hangarUserInfo" class="hangarUserInfo hangarPageElement">

            <h1 id="hangarUserLogin" class="hangarUserLogin">Player</h1>
            <div id="hangarStatisticsContent" class="hangarStatisticsContent ">statistics
            </div>
        </div>

        <div id="hangarMenu" class="hangarMenu hangarPageElement">
                <button 
                class="formBtnEnter loginBtn formElement" 
                id="btnGalaxyMap" 
            >Галактическая карта</button>
        
            <button 
                class="formBtnEnter loginBtn formElement" 
                id="btnArsenal"
            >Арсенал</button>
        
            <button 
                class="formBtnEnter loginBtn formElement" 
                id="btnOptions" 
            >Настройки</button>
        
            <button 
                class="formBtnEnter loginBtn formElement" 
                id="btnStartBattle" 
            >Начать бой</button>         
        </div>
    </div>

<div id="escapeWindow" class="escapeWindow сlosedWindow">
    <label class="escapeWindowElement escapeWindowText" 
    >Pause</label>

    <button 
        class="escapeWindowElement" 
        id="btnOptionsEscape" 
    >Настройки</button>

    <button 
        class="escapeWindowElement" 
        id="btnLeaveBattleEscape" 
    >Выйти из боя</button>

    <button 
        class="escapeWindowElement " 
        id="btnResumeBattleEscape" 
    >Продолжить бой</button>
</div>
<div class="health-bar сlosedWindow" id="health-bar">
    <div class="health-fill" id="health-fill">
</div>
</div>


    `,
    mainContainerInit: function(){
        const container = document.createElement('div');
        container.innerHTML = this.innerHTML;
        document.body.prepend(container)
    },
}
export {mainContainer}