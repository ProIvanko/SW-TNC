
const userDataStorage = {
    userData:{},

    nameOfCellOnServer :'Lovkov_Ivan_SW_TNC',

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
        this.userDataSendToStorage();
    },

    userDataSendToStorage : function(){
        // userDataStorage.updateJQ(JSON.stringify(this.userData))
        localStorage.setItem ('SWUserData', JSON.stringify(this.userData))
    },

    getUserKeys: function() {
        const keysLoginPassword = {};
        Object.keys(this.userData).forEach(element => {
            keysLoginPassword[this.userData[element].userLogin.toLowerCase()] = this.userData[element].userPassword;

        });
        return keysLoginPassword;
    },

    userDataRead : function(){
        if (!localStorage.SWUserData) {
            userDataStorage.userDataSendToLocalStorage()
        } else {
            userDataStorage.userData = JSON.parse(localStorage.getItem('SWUserData'))
        }
        // userDataStorage.userData = userDataStorage.readJQ()
        console.log(userDataStorage.userData)
    },
    
    readJQ: function(nameOfCell){
        let AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
        let StringName = 'Lovkov_Ivan_SW_TNC';
        let outputData

        function Read() 
        {
          $.ajax(
            {
              url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'READ', n : StringName},
              success : ReadReady, error : ErrorHandler
            }
          );
        }
        
        function ReadReady(ResultH)
        {
          if ( ResultH.error!=undefined )
            {alert(ResultH.error); }
          else
          {
            console.log(outputData)
            return outputData;
          }
        }
        
        function ErrorHandler(jqXHR,StatusStr,ErrorStr)
        {
          console.log(StatusStr+' '+ErrorStr);
        }
        Read();

    },
    
    insertJQ: function(jsonContent,nameOfCell = userDataStorage.nameOfCellOnServer){
        let AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
        let StringName = 'Lovkov_Ivan_SW_TNC';
        let stringInfo = jsonContent;

        function insert() 
        {
          $.ajax(
            {
              url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'INSERT', n : StringName, v: stringInfo},
              success : dataInsert, error : ErrorHandler
            }
          );
        }
        
        function dataInsert(ResultH)
        {
          if ( ResultH.error!=undefined )
            {console.log(ResultH.error); }
          else
          {
            console.log(ResultH.result)
          }
        }
        
        function ErrorHandler(jqXHR,StatusStr,ErrorStr)
        {
          console(StatusStr+' '+ErrorStr);
        }
        insert();
    },

    lockgetJQ: function( password){
        let AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
        let StringName = 'Lovkov_Ivan_SW_TNC';
        password = 12345678
        function lockGet () 
        {
          $.ajax(
            {
              url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'LOCKGET', n : StringName, p:password},
              success : dataGet, error : ErrorHandler
            }
          );
        }
        
        function dataGet(ResultH)
        {
            if ( ResultH.error!=undefined ){
                console.log(ResultH.error); 
            }
            else
            {
                console.log(ResultH); 
              return ResultH.result;
            }
        }
        
        function ErrorHandler(jqXHR,StatusStr,ErrorStr)
        {
          console(StatusStr+' '+ErrorStr);
        }
        lockGet();
        
    },

    updateJQ: function(jsonContent,nameOfCell = userDataStorage.nameOfCellOnServer, password){
        let AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
        let StringName = nameOfCell;
        let stringInfo = jsonContent;
        password = 12345678

        function update() 
        {
          $.ajax(
            {
              url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'UPDATE', n : StringName, p:password, v: stringInfo},
              success : ReadReady, error : ErrorHandler
            }
          );
        }
        
        function ReadReady(ResultH)
        {
          if ( ResultH.error!=undefined )
            {console.log(ResultH.error); }
          else
          {
            return 'Done';
          }
        }
        
        function ErrorHandler(jqXHR,StatusStr,ErrorStr)
        {
          console(StatusStr+' '+ErrorStr);
        }
        update();
    },
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

