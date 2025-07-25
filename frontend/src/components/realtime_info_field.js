import React from 'react';

class Sensor {
  constructor(name, unit, pin) {
    this.name = name;
    this.unit = unit;
    this.pin = pin;
  }
}

function MakeRealtimeInfoField({ temp, humidity, light_level, distance }) {
  const sensors = [
    new Sensor("Temperature", "F", 1),
    new Sensor("Humidity", "%", 2),
    new Sensor("Light Level", "lux", 3),
    new Sensor("Distance", "cm", 4)
  ];

  return (
    <div className="realtime-info-fields">
      {sensors.map(sensor => (
        <GetRealtimeInfo
          key={sensor.pin}
          label={sensor.name}
          value={
            sensor.name === "Temperature" ? `${temp ? temp : '--'} ${sensor.unit}` :
            sensor.name === "Humidity" ? `${humidity ? humidity : '--'} ${sensor.unit}` :
            sensor.name === "Light Level" ? `${light_level ? light_level : '--'} ${sensor.unit}` :
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

export default MakeRealtimeInfoField;