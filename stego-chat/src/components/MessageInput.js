import React, { useState } from "react";
import Steganography from "./steganography.js";

const MessageInput = ({ socket, username }) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (socket && input.trim()) {
      Steganography.encodeMessage(input)
        .then((imagefile) => {
          const message = {
            image: imagefile,
            timestamp: new Date().toLocaleTimeString(),
            username: username, // Add username
          };
          socket.send(JSON.stringify(message));
          setInput("");
        })
        .catch((error) => {
          console.error("Failed to encode message:", error);
        });
    }
  };

  // Rest of the component remains the same...

  return (
    <div className="mt-6">
      <div className="flex space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
