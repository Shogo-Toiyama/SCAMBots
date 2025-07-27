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

  useEffect(() => {
    socket.on('connect', () => console.log('Connected:', socket.id));
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
    <div className="realtime-info-fields">
      <div className="realtime-info-header">
        <p className="gradient-text">Sensor Data</p>
      </div>
      <hr className="divider"/>
      <div className="realtime-info-boxes">
        <CreateRealtimeInfoBox label="TEMPERATURE" value={temp || "--"} unit="F"/>
        <CreateRealtimeInfoBox label="HUMIDITY" value="53" unit="%"/>
        <CreateRealtimeInfoBox label="LIGHT LEVEL" value="183" unit="lx"/>
        <CreateRealtimeInfoBox label="DISTANCE" value="120" unit="cm"/>
      </div>
    </div>
  );
}

function CreateRealtimeInfoBox({label, value, unit}) {
  return (
    <div className="realtime-info-box">
      <div className="realtime-info-value">{value}<span className="realtime-info-unit">{unit}</span></div>
      <div className="realtime-info-label">{label}</div>
    </div>
  );
}

export default RealtimeInfoField;