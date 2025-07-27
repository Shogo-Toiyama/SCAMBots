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
  const [isHovered, setIsHovered] = useState(false);

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
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play().then(()=>{
        setIsPlaying(true);
      }).catch((error)=>{
        console.error("Play error: ");
      });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetAudio = () => {
    const newAudio = new Audio(`/speech.mp3?t=${Date.now()}`);
    newAudio.onloadedmetadata = () => {
      setDuration(newAudio.duration || 0);
      setCurrentTime(0);
      setIsPlaying(false);
    };
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = newAudio;
  };

  return (
    <div className="api-call-field">
      <div className="connect-text-and-img">
        <p className={`connect-text ${isHovered ? "hovered" : ""}`}>CONNECT TO SUPERCOMPUTER</p>
        <div className='glow-wrapper'>
          <img src="/connect_to_sp.png" alt="Glow Shadow" className="glow-image" />
          <img 
            className={`sp-image ${isHovered ? "hovered" : ""}`}
            src="/connect_to_sp.png" 
            alt="Connnect to Supercomputer"
            onMouseEnter={()=>{
              setIsHovered(true);
              console.log("hovered");
            }}
            onMouseLeave={()=>{
              setIsHovered(false);
              console.log("left");
            }}
            onClick={sendPicture}
          />
        </div>
      </div>
      <div className='response-field'>
        <div className='header'>
          <div className='title-and-time'>
            <p className='headquarters-text'>Headquarters</p>
            <p className='audio-time'>{formatTime(currentTime)}s / {formatTime(duration)}s</p>
          </div>
          <div className='audio-buttons'>
            <button className="audio-button" onClick = {toggleAudio}>{isPlaying ? "Pause" : "Play"}</button>
            <button className="audio-button" onClick = {resetAudio}>Reset</button>
          </div>
        </div>
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
    );
}

export default ApiCallField