import React from 'react';
import socket from '../socket';

function CommunicationField({}) {
  return (
    <div className="communication-fields">
      <div>
        <button onClick = {sendMessage("forward")}>forward</button>
        <button onClick = {sendMessage("backward")}>backward</button>
        <button onClick = {sendMessage("right")}>right</button>
        <button onClick = {sendMessage("left")}>left</button>
      </div>
    </div>
    );
}

function sendMessage(direction) {
  socket.emit('command', direction);
  console.log(`Sending command: ${direction}`);
}

export default CommunicationField