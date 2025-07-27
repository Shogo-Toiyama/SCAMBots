import React, { useState, useEffect } from "react";
import './communication_field.css'
import socket from '../socket';

function CommunicationField({}) {

  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message:", message);
    socket.emit("display", message);
  };

  return (
    <div className="communication-fields">
      <p className="gradient-text">Message to the local agent</p>
      <div>
        <form onSubmit = {handleSubmit}>
            <input
              type = "text"
              value = {message}
              placeholder="Type your secret message here..."
              onChange={(e) => setMessage(e.target.value)}
            />
          <button type = "submit">Submit</button>
        </form>
      </div>
    </div>
    );
}

export default CommunicationField