import { Search } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { query } from "../services/OpenAIService";


export default function Chat(){
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    const [conversation, setConversation] = useState([])

    const handlerSearch = async () => {
        setLoading( true )
        const response = await query(value)
        console.log( response )
        setConversation( prev => [
            ...prev,
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
        ])
        setValue(prev => '')
        setLoading( false )
    }

    const handlerChange = ({ target: { value:currentValue} }) => {
        setValue( prev => currentValue)
    }


    return <div className="App">
        <div className="App-header">
            <Box sx={{ width:'50%', backgroundColor:'#fff5', p:2, borderRadius:3 }}>
                <List sx={{ color:'#000', backgroundColor:'#fff', mb:2, borderRadius:3 }}>
                    <ListItem>
                        <ListItemText primary={<Typography sx={{ fontWeight:'bold' }}>Chat</Typography>} sx={{display:'flex', justifyContent:'center' }}/>
                    </ListItem>
                    { conversation.map( item => <ListItem key={item.id}>
                        <ListItemText
                            primary={ item.choices[0].message.content }
                            sx={{
                                display:'flex',
                                justifyContent: item.choices[0].message.role==='assistant'?'flex-start':'flex-end'
                            }}
                            />
                    </ListItem>)}
                </List>
                <TextField
                    variant="outlined"
                    sx={{ width:'100%', backgroundColor:'#fff', borderRadius:3 }}
                    InputProps={{
                        endAdornment: loading ? <CircularProgress /> : <IconButton onClick={handlerSearch}><Search /></IconButton>
                    }}
                    value={value}
                    onChange={handlerChange}
                />

            </Box>
        </div>
    </div>
}