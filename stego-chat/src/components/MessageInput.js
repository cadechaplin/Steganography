import React, { useState } from "react";
import Steganography from "./steganography.js";

const MessageInput = ({ socket }) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    console.log("Start send message:", input);
    if (socket && input.trim()) {
      Steganography.encodeMessage(input)
        .then((imagefile) => {
          const message = {
            image: imagefile,
            timestamp: new Date().toLocaleTimeString(),
          };
          console.log("Sending message:", message);
          socket.send(JSON.stringify(message));
          setInput("");
        })
        .catch((error) => {
          console.error("Failed to encode message:", error);
        });
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Type your message..."
      />
      <button
        onClick={sendMessage}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
