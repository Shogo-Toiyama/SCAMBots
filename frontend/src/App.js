import React, { useState, useEffect } from "react";
import RealtimeInfoField from './components/realtime_info_field';
import picture from './picture1.PNG';
import './App.css';
import ApiCallField from "./components/api_call_field";
import CommunicationField from "./components/communication_field";
import SnapshotInfoField from "./components/snapshot_info_field";
import socket from './socket';

function App() {
  const [temp, setTemp ] = useState("");
  const [humidity, setHumidity] = useState("");
  const [lightLevel, setLightLevel] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    socket.on('temp', temp => setTemp(temp));
    socket.on('ultrasonic', distance => setDistance(distance));
    socket.on('humidity', humidity => setHumidity(humidity));
    socket.on('light', light => setLightLevel(light));

    return () => {
      socket.off('temp');
      socket.off('ultrasonic');
      socket.off('humidity');
      socket.off('light');
    };
  }, []);

  return (
    <div className="app">
      <div className="operator-page">
        <p className="website-title">SCAMBots Operator Page</p>
          <RealtimeInfoField/>
          <SnapshotInfoField/>
          <ApiCallField/>
          <CommunicationField/>
      </div>
    </div>
  );
}

export default App;