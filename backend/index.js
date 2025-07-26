require('dotenv').config();
const fs = require('fs');
const cors = require("cors");
const express = require("express");
const http = require('http');
const MQTT = require('mqtt');
const { spawn } = require('child_process');
const path = require('path');

const APP = express();
const server = http.createServer(APP);
const { Server } = require("socket.io");

// ✅ Servimos la carpeta AI (fuera de backend)
APP.use('/images', express.static(path.join(__dirname, '..', 'frontend')));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// --- MQTT CONFIG ---
const CLIENTID = "frontend";
const client = MQTT.connect(process.env.CONNECT_URL, {
  clientId: CLIENTID,
  clean: true,
  connectTimeout: 3000,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  reconnectPeriod: 10000,
  debug: true,
  rejectUnauthorized: false
});

// --- Sensor data ---
let latestTemp = null;
let latestUltrasonic = null;
let latestHumidity = null;
let latestLight = null;

// --- Socket.io logic ---
io.on("connection", (socket) => {
  console.log("Frontend connected to socket");

  // Enviar valores iniciales si existen
  if (latestTemp) socket.emit('temp', latestTemp);
  if (latestUltrasonic) socket.emit('ultrasonic', latestUltrasonic);
  if (latestLight) socket.emit('light', latestLight);

  socket.on('display', (message) => {
    console.log('Received message from frontend:', message);
    client.publish("display", message.toString());
  });

  // ✅ Lógica del botón: ejecutar receive.py con argumento "update"
  socket.on('take_picture', () => {
    console.log('📸 Taking picture...');

    const pythonProcess = spawn('python', [path.join(__dirname, '..', 'AI', 'receive.py'), 'update']);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python script finished with code ${code}`);
      if (code === 0) {
        socket.emit('picture_taken', {
          success: true,
          message: 'Image downloaded!',
          imageUrl: 'http://localhost:8000/images/downloaded_image.jpg'
        });
      } else {
        socket.emit('picture_taken', {
          success: false,
          message: 'Error executing receive.py'
        });
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Frontend disconnected from socket");
  });
});

// Intervalo para enviar datos de sensores
setInterval(() => {
  io.emit('temp', latestTemp);
  io.emit('ultrasonic', latestUltrasonic);
  io.emit('humidity', latestHumidity);
  io.emit('light', latestLight);
}, 1000);

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});

client.on('message', (TOPIC, payload) => {
  console.log("Received from broker:", TOPIC, payload.toString());
  if (TOPIC === 'temp') {
    latestTemp = payload.toString();
  } else if (TOPIC === 'ultrasonic') {
    latestUltrasonic = payload.toString();
  } else if (TOPIC === 'humidity') {
    latestHumidity = payload.toString();
  } else if (TOPIC === 'light') {
    latestLight = payload.toString();
  }
});