import React, { useState, useEffect } from "react";
import socket from '../socket';

function SnapshotInfoField({picPath}) {

  const [distance, setDistance] = useState("-- cm");
  let distanceTime = new Date();
  let picTime = new Date();
  const distanceTimeDisplay = distanceTime ? distanceTime.toLocaleTimeString() : '--:--:--';
  const pictureTimeDisplay = picTime ? picTime.toLocaleTimeString() : '--:--:--';

  return (
    <div className="snapshot-info-fields">
      <div>
        <p>Snapped Distance: {distance}</p>
        <button onClick={snapDistance}>Snap</button>
        <p>Updated at: {distanceTimeDisplay}</p>
      </div>

      <div>
        <p>Image from Camera</p>
        <img src={picPath}/>
        <button onClick = {takePicture}>Picture</button>
        <p>Updated at: {pictureTimeDisplay}</p>
      </div>
    </div>
  );
}

function snapDistance() {
  console.log("Distance snapped!");
}

function takePicture() {
  console.log("Picture taken!");
}

export default SnapshotInfoField;