import React, { useEffect, useState } from 'react';
import socket from '../socket'

const sendPicture = () => {
  socket.emit("analyze_picture")
}



function ApiCallField({}) {

  const [extraText, setExtraText] = useState('');

  useEffect(() => {
    fetch('/openai_response_text.txt')
  
      .then((res) => res.text())
      .then((text) => setExtraText(text))
      .catch((err) => console.error('Error loading text file:', err));
  }, []);

  return (
    <div className="api-call-fields">
      <div>
        <button onClick = {sendPicture}>Analyze Image</button>
        <p>Headquarters:</p>
        <p> {extraText}</p>
        <button onClick = {playAudio}>Play Audio</button>
      </div>
    </div>
    );
}

function playAudio() {
  const audio = new Audio('/speech.mp3');
  audio.play().catch(error => {
    console.error('Error playing audio:', error);
  });
}

export default ApiCallField