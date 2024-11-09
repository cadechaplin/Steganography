import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../WebSocketContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Steganography from "./steganography";

const ChatRoom = () => {
  const socket = useContext(WebSocketContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => console.log("Connected to WebSocket");
      socket.onclose = () => console.log("Disconnected from WebSocket");
      socket.onerror = (error) => console.error("WebSocket error:", error);

      socket.onmessage = (event) => {
        console.log("Received a message");
        console.log("Received raw message:", event);
        const message = JSON.parse(event.data);
        if (!message.image) {
          console.error("Received message without image:", message);
          return;
        }
        Steganography.decode(message.image)
          .then((textMessage) => {
            setMessages((prevMessages) => [...prevMessages, textMessage]);
          })
          .catch((error) => {
            console.error("Failed to decode message:", error);
          });
      };
    }
  }, [socket]);

  return (
    <div>
      <h1>Stego Chat Room</h1>
      <MessageList messages={messages} />
      <MessageInput socket={socket} />
    </div>
  );
};

export default ChatRoom;
