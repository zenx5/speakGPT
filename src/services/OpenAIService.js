import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
})

const openai = new OpenAIApi( config )

const query = async (text) => {
    try{
        const { data } = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.6,
        })
        return data
    }catch( error ){
        return error
    }
}

export {
    query
}