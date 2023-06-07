import {initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {getDatabase, ref, set, onValue, child, push, update } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const userDataStorage = {
    userData:{},

    firebaseInit:function (){
        initializeApp(userDataStorage.firebaseConfig)
        this.userDataRead()
    },

    firebaseConfig: {
        apiKey: "AIzaSyAV__rCSHoBh--OfHIU_FZBfUbzKmUEU8M",
        authDomain: "sw-tnc.firebaseapp.com",
        databaseURL: "https://sw-tnc-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "sw-tnc",
        storageBucket: "sw-tnc.appspot.com",
        messagingSenderId: "925630333619",
        appId: "1:925630333619:web:1bf6271c53644822a466c6"
    },

    writeStorageData : function (path,  jsonData){
        set(ref(getDatabase(), 'Players/'), jsonData);
        this.userDataRead()
    },

    userAdd : function (userLogin, userPassword, userSide) {
        if(userDataStorage.userData == null){userDataStorage.userData = {}}
        const userID = userLogin.toLowerCase();
        this.userData[userID] = {userLogin, userPassword, userSide};
        this.userData[userID].statistics = {
            rebel : {
              'Wins':0,
              'Games': 0,
              'Inflicted damage': 0,
              'Inflicted damage to flagman': 0,
              'Deaths': 0,
            },
            empire : {
                'Wins':0,
                'Games': 0,
                'Inflicted damage': 0,
                'Inflicted damage to flagman': 0,
                'Deaths': 0,
            },
        },
        this.userDataSendToStorage();

    },

    userDataSendToStorage : function(){
        localStorage.setItem ('SWUserData', JSON.stringify(this.userData));
        this.writeStorageData('Players/',JSON.stringify(this.userData))
    },

    getUserKeys: function() {
        const keysLoginPassword = {};
        if (this.userData){
            Object.keys(this.userData).forEach(element => {
                keysLoginPassword[this.userData[element].userLogin.toLowerCase()] = this.userData[element].userPassword;
            });
        }
        return keysLoginPassword;
    },

    userDataRead : function(){
        try {
            const db = getDatabase();
            const playersData = ref(db, 'Players/');
      
            onValue(playersData, (snapshot) => {

              const data = snapshot.val();
              if (data) {
                userDataStorage.userData = JSON.parse(data)
              }
              else {
                if (!localStorage.SWUserData) {
                    userDataStorage.userData = JSON.parse(localStorage.getItem('SWUserData'))
                } else {
                    // userDataStorage.userDataSendToStorage()
                }
              }
            });
          }
          catch (e) {
            this.myView.showErrorApp();
          }
        },
        
};

// userDataStorage.userAdd('Ivanko', '1243','rebel');
// userDataStorage.userAdd('Emily', '5678','empire');

const currentUserData = {
    userSide : 'empire',

    currentUserInit(userData){
        this.userSide = userData.userSide
        this.userLogin = userData.userLogin;
        this.userStatistics = userData.statistics
        this.parsedUserStatistics = this.currentUserStringStatistcsParse();
    },

    currentUserStringStatistcsParse: function(){
      let statString = 'Statistics:';
      const userSide = this.userSide;
      const userStats = this.userStatistics[this.userSide];

      for (let stat in userStats){
        statString += `\n<li>${stat}: ${userStats[stat]}</li>`
      };
      return statString
    },
}

export {userDataStorage, currentUserData}

