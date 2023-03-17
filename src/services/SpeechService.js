class SpeechService extends SpeechSynthesisUtterance {

    constructor( string = '' ) {
        super()
        this.voices = window.speechSynthesis.getVoices()
        this.text = string;
    }

    setVoice( codeLang ){
        const voiceSelected = this.voices.filter( voice => voice.lang === codeLang )
        if( voiceSelected ) {
            this.voice = voiceSelected
        }
    }

    toVoice( string ){
        if( string ) {
            this.text = string
        }
        window.speechSynthesis.speak(this);
    }
}

export default SpeechService