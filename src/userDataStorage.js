
const userDataStorage = {
    userData:{},

    userAdd : function (userLogin, userPassword, userSide) {
        const userID = userLogin.toLowerCase();
        this.userData[userID] = {userLogin, userPassword, userSide};
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
    },

    userDataCheck : function(){
        if (!localStorage.SWUserData) {
            userDataStorage.userDataSendToLocalStorage()
        } else {
            userDataStorage.userData = JSON.parse(localStorage.getItem('SWUserData'))
        }
    }
};

// userDataStorage.userAdd('Ivanko', '1243','rebel');
// userDataStorage.userAdd('Emily', '5678','empire');

const currentUserData = {
    userSide : 'empire',

    currentUserInit(userData){
        this.userSide = userData.userSide
        this.userLogin = userData.userLogin;

    }
}

export {userDataStorage, currentUserData}

