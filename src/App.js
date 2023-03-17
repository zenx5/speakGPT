import { ButtonBase, IconButton, Typography } from '@mui/material'
import { Mic } from '@mui/icons-material'

import SpeechService from './services/SpeechService'
import ListenService from './services/ListenService'

import './App.css';
import { useState } from 'react';

function App() {
  const [active, setActive] = useState(false)
  const [text, setText] = useState('')
  const speech = new SpeechService('')
  const listen = new ListenService()

  const handlerActive = () => {
    if( active ) {
      speech.toVoice(text)
    }else{
      listen.listenStart( result => setText(prev => result ))
    }
    setActive( prev => !prev )
  }

  return (
    <div className="App">
      <header className="App-header">
        <IconButton onClick={handlerActive}>
          <Mic sx={{ color:active?'#0f0':'#fff', border: active?'2px solid #0f0':'2px solid transparent', borderRadius:20, p:5, width:64, height:64 }} />
        </IconButton>
        <ButtonBase onClick={()=>speech.toVoice(text)}>
          <Typography>{text}</Typography>
        </ButtonBase>
      </header>
    </div>
  );
}

export default App;
