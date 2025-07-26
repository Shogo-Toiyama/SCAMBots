import React from 'react';

function ApiCallField({}) {
  return (
    <div className="api-call-fields">
      <div>
        <button>Analyse Image</button>
        <p>Supercomputer: Hello! I'm ChatGPT!</p>
        <button onClick = {playAudio}>Play Audio</button>
      </div>
    </div>
    );
}

function playAudio() {
  const audio = new Audio('path/to/audio/file.mp3');
  audio.play().catch(error => {
    console.error('Error playing audio:', error);
  });
}

export default ApiCallField