import React, { useState, useEffect } from "react";

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
      <div>
        <form onSubmit = {handleSubmit}>
          <label>
            Message:
            <input
              type = "text"
              value = {message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <button type = "submit">Submit</button>
        </form>
      </div>
    </div>
    );
}

export default CommunicationField