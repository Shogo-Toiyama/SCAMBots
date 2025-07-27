import React, { useState, useEffect } from "react";
import socket from '../socket';
import './snapshot_info_field.css';

function SnapshotInfoField() {

  const [snapshotUrl, setSnapshotUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  const [distance, setDistance] = useState("-- cm");
  let distanceTime = new Date();
  let picTime = new Date();
  const distanceTimeDisplay = distanceTime ? distanceTime.toLocaleTimeString() : '--:--:--';
  const pictureTimeDisplay = picTime ? picTime.toLocaleTimeString() : '--:--:--';

  const imagePath = "/downloaded_image.jpg";

  useEffect(() => {
    socket.on('picture_taken', data => {
      setStatusMessage(data.message);
      if (data.imageUrl) {
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
        <img 
          className={`snapped-image ${isHovered ? "darkened" : ""}`}
          src={imagePath}
          alt="downloaded_image"
        />
        {/* {snapshotUrl ? (
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
        )} */}
        <div className={`overlay ${isHovered ? "visible" : ""}`}>
          <p className="overlay-text">REQUEST NEW PICTURE</p>
        </div>
      </div>
    </div>
  );
}

export default SnapshotInfoField;