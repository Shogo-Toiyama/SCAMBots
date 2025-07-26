import React, { useState, useEffect } from "react";
import RealtimeInfoField from './components/realtime_info_field';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:8000');

function App() {
  const [pictureStatus, setPictureStatus] = useState("");
  const [temp, setTemp ] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lightLevel, setLightLevel] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    socket.on('connect', () => console.log('Connected:', socket.id));
    socket.on('picture_taken', data => {
      setPictureStatus(data.message);
      setTimeout(() => setPictureStatus(""), 3000); // Clear status after 3 seconds
    });
    socket.on('temp', temp => setTemp(temp));
    socket.on('ultrasonic', distance => setDistance(distance));
    socket.on('humidity', humidity => setHumidity(humidity));
    socket.on('light', light => setLightLevel(light));
    return () => {
      socket.off('picture_taken');
    };
  }, []);

  return (
    <div className="app">
      <div className="operator-page">
        <h1>SCAMBots Operator Page</h1>
          <div>
            <h2>Real Time Info Field</h2>
            <RealtimeInfoField temp = {temp} humidity = {humidity} lightlevel = {lightLevel} distance = {distance}/>
          </div>
          <div>
            <h2>Snapshot Info Field</h2>
            <p>Distance snapshots here.</p>
            <p>Fields name will be changed after.</p>
          </div>
          <div>
            <h2>API Call Field</h2>
            <p>Distance snapshots here.</p>
            <p>Fields name will be changed after.</p>
          </div>
          <div>
            <h2>Communication Field</h2>
            <p>Distance snapshots here.</p>
            <p>Fields name will be changed after.</p>
          </div>
      </div>
    </div>
  );
}

export default App;
