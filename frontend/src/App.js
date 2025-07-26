import React, { useState, useEffect } from "react";
import RealtimeInfoField from './components/realtime_info_field';
import picture from './picture1.PNG';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:8000');

function App() {
  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [temp, setTemp ] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lightLevel, setLightLevel] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    socket.on('connect', () => console.log('Connected:', socket.id));
    socket.on('picture_taken', data => {
      setStatusMessage(data.message);
      if (data.imageUrl) {
        setSnapshotUrl(data.imageUrl);
      }
    });
    socket.on('temp', temp => setTemp(temp));
    socket.on('ultrasonic', distance => setDistance(distance));
    socket.on('humidity', humidity => setHumidity(humidity));
    socket.on('light', light => setLightLevel(light));
    return () => {
      socket.off('picture_taken');
      socket.off('temp');
      socket.off('ultrasonic');
      socket.off('humidity');
      socket.off('light');
    };
  }, []);

  const GetPicture = () => {
    socket.emit("take_picture");
  };

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
            <p>{statusMessage || "(There is not status message.)"}</p>
            <div>
              {snapshotUrl && (
                  <img
                    src={snapshotUrl}
                    alt="Snapshot"
                    style={{ width: "300px", marginTop: "10px" }}
                  />
                ) || "(There is no snapshot.)"}
            </div>
            <button onClick={GetPicture} className={'App-picture-button'}>
            <img
              src={picture}
              alt="picture"
              style={{ width: '100px', height: '64px' }}
            />
          </button>
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
