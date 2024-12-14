import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../WebSocketContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Steganography from "./steganography";

const ChatRoom = () => {
  const socket = useContext(WebSocketContext);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  // ChatRoom.js
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (!message.image) {
          console.error("Received message without image:", message);
          return;
        }
        Steganography.decode(message.image)
          .then((textMessage) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: textMessage,
                username: message.username,
                timestamp: message.timestamp,
                image: message.image, // Include the carrier image
              },
            ]);
          })
          .catch((error) => {
            console.error("Failed to decode message:", error);
          });
      };
    }
  }, [socket]);

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <form onSubmit={handleJoin} className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-primary">
                Join Chat
              </h2>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your username"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8 text-primary">
                  Stego Chat Room
                </h1>
                <MessageList messages={messages} />
                <MessageInput socket={socket} username={username} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
