import React, { useState, useEffect } from "react";
import RealtimeInfoField from './components/realtime_info_field';
import socket from './socket';
import './App.css';
import SnapshotInfoField from "./components/snapshot_info_field";
import ApiCallField from "./components/api_call_field";
import CommunicationField from "./components/communication_field";

function App() {
  const [pictureStatus, setPictureStatus] = useState();

  useEffect(() => {
    socket.on('connect', () => console.log('Connected:', socket.id));
    socket.on('picture_taken', data => {
      setPictureStatus(data.message);
      setTimeout(() => setPictureStatus(""), 3000); // Clear status after 3 seconds
    });
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
            <RealtimeInfoField/>
          </div>
          <div>
            <h2>Snapshot Info Field</h2>
            <SnapshotInfoField/>
          </div>
          <div>
            <h2>API Call Field</h2>
            <ApiCallField/>
          </div>
          <div>
            <h2>Communication Field</h2>
            <CommunicationField/>
          </div>
      </div>
    </div>
  );
}

export default App;
