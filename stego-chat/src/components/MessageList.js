// MessageList.js
import React, { useEffect, useRef } from "react";

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 h-96 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="p-4 rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex gap-4">
            {/* Image column */}
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={msg.image}
                alt="Carrier"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* Message content column */}
            <div className="flex flex-col flex-grow">
              <span className="text-sm font-semibold text-primary">
                {msg.username}
              </span>
              <p className="text-gray-800">{msg.text}</p>
              <span className="text-xs text-gray-500 mt-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
