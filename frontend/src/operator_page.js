import React, { useEffect, useState } from 'react';
import MakeRealtimeInfoField from './components/realtime_info_field';
import picture from './picture1.PNG';
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

function OperatorPage() {
  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    socket.on("picture_taken", (data) => {
      setStatusMessage(data.message);
      if (data.imageUrl) {
        setSnapshotUrl(data.imageUrl);
      }
      alert(data.message);
    });

    return () => {
      socket.off("picture_taken");
    };
  }, []);

  const GetPicture = () => {
    console.log("Botón presionado");
    socket.emit("take_picture");
  };

  return (
    <div className="operator-page">
      <h1>SCAM Bots Operator Page</h1>
      <div>
        <h2>Real Time Info Field</h2>
        <MakeRealtimeInfoField temp={50} humidity={80} light_level={40} distance={30} />
      </div>
      <div>
        <h2>Snapshot Info Field</h2>
        <p>{statusMessage}</p>
        {snapshotUrl && (
          <img
            src={snapshotUrl}
            alt="Snapshot"
            style={{ width: "300px", marginTop: "10px" }}
          />
        )}
      </div>
      <div>
        <h2>API Call Section</h2>
        <p>Distance snapshots here.</p>
        <p>Fields name will be changed after.</p>
      </div>
      <div>
        <h2>Communication Field</h2>
        <p>Distance snapshots here.</p>
        <p>Fields name will be changed after.</p>
      </div>
      <button onClick={GetPicture} className={'App-picture-button'}>
        <img
          src={picture}
          alt="picture"
          style={{ width: '100px', height: '64px' }}
        />
      </button>
    </div>
  );
}

export default OperatorPage;