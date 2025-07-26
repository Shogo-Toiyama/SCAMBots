import React, { useState, useEffect } from "react";
import socket from '../socket';

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
      {sensors.map(sensor => (
        <GetRealtimeInfo
          key={sensor.pin}
          label={sensor.name}
          value={
            sensor.name === "Temperature" ? `${temp ? temp : '--'} ${sensor.unit}` :
            sensor.name === "Humidity" ? `${humidity ? humidity : '--'} ${sensor.unit}` :
            sensor.name === "Light Level" ? `${lightlevel ? lightlevel : '--'} ${sensor.unit}` :
            sensor.name === "Distance" ? `${distance ? distance : '--'} ${sensor.unit}` :
            "N/A"
          }
        />
      ))}
    </div>
  );
}

function GetRealtimeInfo({ label, value }) {
  return (
    <div className="realtime-info-field">
      <span className="label">{label}: </span>
      <span className="value">{value}</span>
    </div>
  );
}

export default RealtimeInfoField;