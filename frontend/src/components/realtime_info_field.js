import React, { useState, useEffect } from "react";
import socket from '../socket';
import './realtime_info_field.css';

class Sensor {
  constructor(name, unit, pin) {
    this.name = name;
    this.unit = unit;
    this.pin = pin;
  }
}

function RealtimeInfoField() {
  const sensors = [
    new Sensor("Temperature", "F", 1),
    new Sensor("Humidity", "%", 2),
    new Sensor("Light Level", "lux", 3),
    new Sensor("Distance", "cm", 4)
  ];

  const [temp, setTemp ] = useState();
  const [humidity, setHumidity] = useState();
  const [lightlevel, setLightLevel] = useState();
  const [distance, setDistance] = useState();
  const [isTempSnapped, setIsTempSnapped] = useState(false);
  const [isHumiditySnapped, setIsHumiditySnapped] = useState(false);
  const [isLightlevelSnapped, setIsLightlevelSnapped] = useState(false);
  const [isDistanceSnapped, setIsDIstanceSnapped] = useState(false);

  const [snappedTemp, setSnappedTemp] = useState();
  const [snappedHumidity, setSnappedHumidity] = useState();
  const [snappedLightlevel, setSnappedLightlevel] = useState();
  const [snappedDistance, setSnappedDistance] = useState();

  const [mqttStatus, setMqttStatus] = useState("unknown");

  useEffect(() => {
    socket.on('connect', () => console.log('Connected:', socket.id));
    socket.on('temp', temp => setTemp(temp));
    socket.on('ultrasonic', distance => setDistance(distance));
    socket.on('humidity', humidity => setHumidity(humidity));
    socket.on('light', light => setLightLevel(light));
    socket.on('mqtt_status', mqtt_status => setMqttStatus(mqtt_status));
    return () => {
      socket.off('temp');
      socket.off('ultrasonic');
      socket.off('humidity');
      socket.off('light');
      socket.off('mqtt_status');
    };
  }, []);

  const snap = (label) => {
    switch (label) {
      case "TEMPERATURE":
        if (isTempSnapped) {
          setIsTempSnapped(false);
        } else {
          setSnappedTemp(temp);
          setIsTempSnapped(true);
        }
        break;
      case "HUMIDITY":
        if (isHumiditySnapped) {
          setIsHumiditySnapped(false);
        } else {
          setSnappedHumidity(humidity);
          setIsHumiditySnapped(true);
        }
        break;
      case "LIGHT LEVEL":
        if (isLightlevelSnapped) {
          setIsLightlevelSnapped(false);
        } else {
          setSnappedLightlevel(lightlevel);
          setIsLightlevelSnapped(true);
        }
        break;
      case "DISTANCE":
        if (isDistanceSnapped) {
          setIsDIstanceSnapped(false);
        } else {
          setSnappedDistance(distance);
          setIsDIstanceSnapped(true);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="realtime-info-fields">
      <div className="realtime-info-header">
        <p className="gradient-text">Sensor Data</p>
        <div className={`indicator ${mqttStatus}`}/>
      </div>
      <hr className="divider"/>
      <div className="realtime-info-boxes">
        <CreateRealtimeInfoBox label="TEMPERATURE" value={isTempSnapped ? snappedTemp : temp || "--"} unit="F" onSnap={snap} isSnapped={isTempSnapped}/>
        <CreateRealtimeInfoBox label="HUMIDITY" value={isHumiditySnapped ? snappedHumidity : humidity || "--"} unit="%" onSnap={snap} isSnapped={isHumiditySnapped}/>
        <CreateRealtimeInfoBox label="LIGHT LEVEL" value={isLightlevelSnapped ? snappedLightlevel : lightlevel || "--"} unit="lx" onSnap={snap} isSnapped={isLightlevelSnapped}/>
        <CreateRealtimeInfoBox label="DISTANCE" value={isDistanceSnapped ? snappedDistance : distance || "--"} unit="cm" onSnap={snap} isSnapped={isDistanceSnapped}/>
      </div>
    </div>
  );
}

function CreateRealtimeInfoBox({label, value, unit, onSnap, isSnapped}) {
  return (
    <div className={`realtime-info-box ${isSnapped ? "snapped" : ""}`}>
      <div className={`realtime-info-value ${isSnapped ? "snapped" : ""}`}>{value}<span className="realtime-info-unit">{unit}</span></div>
      <div className={`realtime-info-label ${isSnapped ? "snapped" : ""}`}>{label}</div>
      <button 
        className="snap-button"
        onClick={()=>onSnap(label)}
      >
        {isSnapped ? "UNSNAP" : "SNAP"}
      </button>
    </div>
  );
}

export default RealtimeInfoField;