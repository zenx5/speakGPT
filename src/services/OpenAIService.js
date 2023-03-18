import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
})

const openai = new OpenAIApi( config )

const query = async (text) => {
    try{
        const { data } = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role:'user',
                content: text
            }],
            temperature: 0.2,
        })
        return data
    }catch( error ){
        return error
    }
}

export {
    query
}