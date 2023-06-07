import {options} from './options.js'
const audioManager = {
    audioList:{ },

    audioOptionsUpdate: function(){
        for (let audio in audioManager.audioList){
            audioManager.audioList[audio].volumeUpdate();
        }
    },

    audioInit: function(){
        // class AudioUnit {
        //     constructor( src, audioType){
        //         this = new Audio();
        //         this.preload = 'auto';
        //         this.volume = 0.1*options[audioType];
        //         this.volumeUpdate = function(){
        //             this.volume = 0.1*options[audioType];
        //         }
        //         this.src = src;
        //         audioManager.audioList[this] = this;
        //     }
        // };
        
        // let TIEBlast = new AudioUnit('resource/3DModels/TIE-Defender/blast.mp3',sounds)

        const AWingBlast = new Audio();
        AWingBlast.preload = 'auto';
        AWingBlast.volume = 0.1*options.sounds;
        AWingBlast.volumeUpdate = function(){
            this.volume = 0.1*options.sounds;
        }
        AWingBlast.src = 'resource/3DModels/A-Wing/wpn_xwing_blaster_fire.wav';
        audioManager.audioList.AWingBlast = AWingBlast;

        const TIEBlast = new Audio();
        TIEBlast.preload = 'auto';
        TIEBlast.volume = 0.1*options.sounds;
        TIEBlast.volumeUpdate = function(){
            this.volume = 0.1*options.sounds;
        }
        TIEBlast.src = 'resource/3DModels/TIE-Defender/blast.wav';
        audioManager.audioList.TIEBlast = TIEBlast;

        
        const backgroundMusic = new Audio();
        backgroundMusic.preload = 'auto';
        backgroundMusic.loop = true;
        backgroundMusic.muted = false;
        backgroundMusic.volume = 0.1*options.music;
        backgroundMusic.volumeUpdate = function(){
            this.volume = 0.1*options.music;
        }
        backgroundMusic.src = 'resource/pageMedia/EmpireMarch.mp3';
        audioManager.audioList.backgroundMusic = backgroundMusic;
    }
}

export{audioManager}