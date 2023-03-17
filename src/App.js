import { ButtonBase, CircularProgress, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Mic, Search } from '@mui/icons-material'

import SpeechService from './services/SpeechService'
import ListenService from './services/ListenService'
import { query } from './services/OpenAIService'

import './App.css';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [active, setActive] = useState(false)
  const [text, setText] = useState('que es una ballena')
  const speech = new SpeechService('')
  const listen = new ListenService()

  const handlerActive = async () => {
    if( active ) {
      speech.toVoice(text)
    }else{
      listen.listenStart( result => setText(prev => result ))
    }
    setActive( prev => !prev )
  }

  const handlerSearch = async () => {
    console.log( speech )
    speech.toVoice(text)
    setLoading( true )
    const response = await query(text)
    setResults( prev => response.choices )
    // response.choices.forEach( async choice => {
    //   await speech.toVoice( choice.text )
    // })
    setLoading( false )
  }

  return (
    <div className="App">
      <header className="App-header">
        <IconButton onClick={handlerActive}>
          <Mic sx={{ color:active?'#0f0':'#fff', border: active?'2px solid #0f0':'2px solid transparent', borderRadius:20, p:5, width:64, height:64 }} />
        </IconButton>
        <ButtonBase onClick={handlerSearch}>
          <Typography pr={2}>{text}</Typography>
          <Search />
        </ButtonBase>
        { loading ?
          <CircularProgress />
        : <List>
          { results.map( (result, index) => <ListItemButton onClick={()=>speech.toVoice(result?.message?.content)}>
            <ListItem key={index}>
              <ListItemText primary={result?.message?.content}/>
            </ListItem>
          </ListItemButton>)}
        </List>}
      </header>
    </div>
  );
}

export default App;
