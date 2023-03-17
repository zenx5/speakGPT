class SpeechService extends SpeechSynthesisUtterance {

    constructor( string = '', SpeechSynthesis = window.speechSynthesis ) {
        super()
        this.SpeechSynthesis = SpeechSynthesis
        this.voices = this.SpeechSynthesis.getVoices()
        this.text = string.replaceAll('\n','').replaceAll('\t','')
    }

    setVoice( codeLang ){
        const voiceSelected = this.voices.filter( voice => voice.lang === codeLang )
        if( voiceSelected ) {
            this.voice = voiceSelected
        }
    }

    isSpeaking(){
        return window.speechSynthesis.speaking
    }

    toVoice( stringData ){
        if( this.isSpeaking() ) throw "Yet speking..."
        const string = stringData.replaceAll('\n','').replaceAll('\t','').replaceAll('.','')
        if( string ) {
            this.text = string
        }
        this.SpeechSynthesis.speak(this);
    }

    cancelSpeak(){
        this.SpeechSynthesis.cancel()
    }
}

export default SpeechService