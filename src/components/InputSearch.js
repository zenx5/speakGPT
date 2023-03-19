import { useState } from "react"
import { TextField, CircularProgress, FormControl } from "@mui/material"
import { Mic, Search } from "@mui/icons-material"
import { query } from "../services/OpenAIService"
import { useAppContext } from "../tools/AppContext"
import MenuActions from "./MenuActions"
import { useListen } from "../services/ListenService"

export default function InputSearch(){
    const [value, setValue] = useState('')
    const [
        { loading, conversation },
        setContext, setContextOf
    ] = useAppContext()
    const listen = useListen()

    const icons = [
        <Search />,
        <Mic />
    ]

    const handlerSearch = async () => {
        if ( loading ) throw "Espere a que termine de cargar"
        setContextOf( 'loading', true )
        const response = await query(value)
        console.log( response )
        setContextOf(
            'conversation',
            [
                ...conversation,
                {
                    ...response,
                    id: `${response.id}-user`,
                    choices:[{
                        message:{
                            content: value,
                            role:'user'
                        }
                    }]
                },
                response
            ]
        )
        setValue(prev => '')
        setContextOf( 'loading', false )
    }

    const handlerListen = async () => {
        listen.listenStart()
    }

    const handlerChange = ({ target: { value:currentValue} }) => {
        setValue( prev => currentValue)
    }

    const handlerKeyDown = async ({ keyCode }) => {
        if( keyCode===13 ) await handlerSearch()
    }

    const handlerAction = async (option) => {
        if( option===1 ) await handlerSearch()
        if( option===2 ) await handlerListen()
    }


    return <FormControl sx={styleFormControl}>
        <TextField
            variant="outlined"
            sx={styleTextField}
            InputProps={{
                endAdornment: loading ? <CircularProgress /> : <MenuActions items={icons} onAction={handlerAction}></MenuActions>
            }}
            value={value}
            onChange={handlerChange}
            onKeyDown={handlerKeyDown}
        />
    </FormControl>
}

const styleFormControl = {
    width:'100%'
}

const styleTextField = {
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:3
}