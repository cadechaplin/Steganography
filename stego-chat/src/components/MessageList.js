// src/components/MessageList.js
import React from "react";

const MessageList = ({ messages }) => (
  <div>
    {messages.map((msg, index) => (
      <div key={index} className="message">
        {msg}
      </div>
    ))}
  </div>
);

export default MessageList;
