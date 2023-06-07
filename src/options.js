import {audioManager} from './audioManager.js'
const options = {
    music : 1,
    sounds : 1,
    voices : 1,

    optionsWindowInnerHTML:`
    <div id="optionsWindow" class="optionsWindow сlosedWindow">
    <table>
        <caption>options</caption>
        <tr>
            <td><label for = 'musicSlider'>Music</label></td>
             <td><input type="range" min="0" max="100" value="100" class="sliderOption" id="musicSlider"></td>
            <td><label id="musicValue">100</label></td>
        </tr>
        <tr>
            <td><label for = 'soundsSlider'>Sounds</label></td>
             <td><input type="range" min="0" max="100" value="100" class="sliderOption" id="soundsSlider"></td>
            <td><label id="soundValue">100</label></td>
        </tr>
        <tr>
            <td><label for = 'voiceSlider'>Voices</label></td>
             <td><input type="range" min="0" max="100" value="100" class="sliderOption" id="voiceSlider"></td>
            <td> <label id="voiceValue">100</label></td>
        </tr>    
    </table>
    <button id="btnOptionsClose" class="btnOptionsClose ">Назад</button>
</div>
`,
    optionListenersInit: function(){
        let optionsWindow = document.createElement('div')
        optionsWindow.innerHTML = options.optionsWindowInnerHTML;
        document.body.append(optionsWindow)

        
        optionsWindow.oninput = function(event) {
            switch (event.target.id) {
                case 'musicSlider':{
                    musicValue.innerHTML = musicSlider.value;
                    options.music = musicSlider.value/100;
                    break
                }
                case 'soundsSlider':{
                    soundValue.innerHTML = soundsSlider.value;
                    options.sounds = soundsSlider.value/100;
                    break
                }
                case 'voiceSlider':{
                    voiceValue.innerHTML = voiceSlider.value;
                    options.voices = voiceSlider.value/100;
                    break
                }
            }
            audioManager.audioOptionsUpdate();
        }
    }
}
export {options}