class ListenService extends window.webkitSpeechRecognition {
    constructor(){
        super()
        this.interimResults = true;
        this.continuous = true;
        this.result = ''
        this.addEventListener('result', (event) => {
            const result = event.results[event.results.length - 1][0].transcript;
            this.result = result
            if( this.handler ) {
                this.handler(result)
            }
        } )
    }

    listenStart(handler){
        this.handler = handler
        this.start()
    }

    listenStop(){
        this.stop()
    }

    getResult(){
        return this.result
    }
}

export default ListenService

function useListen(){
    return new ListenService()
}

export { useListen }

