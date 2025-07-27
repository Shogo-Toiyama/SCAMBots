import React, { useState, useEffect } from "react";
import socket from '../socket';
import picture from '../picture1.PNG';
import './snapshot_info_field.css';

function SnapshotInfoField({picPath}) {

  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  const [distance, setDistance] = useState("-- cm");
  let distanceTime = new Date();
  let picTime = new Date();
  const distanceTimeDisplay = distanceTime ? distanceTime.toLocaleTimeString() : '--:--:--';
  const pictureTimeDisplay = picTime ? picTime.toLocaleTimeString() : '--:--:--';

  useEffect(() => {
    socket.on('picture_taken', data => {
      setStatusMessage(data.message);
      if (data.imageUrl) {
        // Evitar caché con timestamp
        const urlWithTimestamp = data.imageUrl + '?t=' + new Date().getTime();
        setSnapshotUrl(urlWithTimestamp);
      }
    });

    return () => {
      socket.off('picture_taken');
    };
  }, []);

  const GetPicture = () => {
    socket.emit("take_picture");
    console.log("get picture!!");
  };

  const sendPicture = () => {
    socket.emit("analyze_picture")
  }

  return (
    <div>
      <p>Distance snapshots here.</p>
      <div 
        className="image-wrapper"
        onClick={GetPicture}
        onMouseEnter={()=>{
          setIsHovered(true);
          console.log("hovered");
        }}
        onMouseLeave={()=>{
          setIsHovered(false);
          console.log("left");
        }}
      >
        {snapshotUrl ? (
          <img
            className={`snapped-image ${isHovered ? "darkened" : ""}`}
            src={snapshotUrl}
            alt="Snapshot"
          />
        ) : (
          <img 
            className={`snapped-image ${isHovered ? "darkened" : ""}`}
            src="/scambots_preview.png" 
            alt="Secret Photo"
          />
        )}
        <div className={`overlay ${isHovered ? "visible" : ""}`}>
          <p className="overlay-text">REQUEST NEW PICTURE</p>
        </div>
      </div>
    </div>
  );
}

export default SnapshotInfoField;