import React, { useRef, useEffect, useState } from 'react';
import socket from '../socket'
import './api_call_field.css';

const sendPicture = () => {
  socket.emit("analyze_picture")
}

const formatTime = (time) => {
  if (isNaN(time)) return '--:--';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

function ApiCallField({}) {
  const audioRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [extraText, setExtraText] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetch('/openai_response_text.txt')
  
      .then((res) => res.text())
      .then((text) => setExtraText(text))
      .catch((err) => console.error('Error loading text file:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/speech.mp3');
    }

    if (audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Play error:", error);
      });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="api-call-fields">
      <div>
        <button onClick = {sendPicture}>Analyze Image</button>
        <div></div>
        <div className='response-field'>
          <p className='headquarters-text'>Headquarters</p>
          <audio ref={audioRef} src="/speech.mp3" />
          <button onClick = {toggleAudio}>{isPlaying ? "Pause" : "Play"}</button>
          <button onClick = {resetAudio}>Reset</button>
          <p>{formatTime(currentTime)}s / {formatTime(duration)}s</p>
          <hr/>
          <p className='extra-text'>
            {extraText.split(/\. (?=[A-Z])/).map((sentence, index) => (
              <span key={index}>
                {sentence.trim() + '.'}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
    );
}

export default ApiCallField