// src/App.js
import React from "react";
import { WebSocketProvider } from "./WebSocketContext";
import ChatRoom from "./components/ChatRoom.js";

const App = () => (
  <WebSocketProvider>
    <ChatRoom />
  </WebSocketProvider>
);

export default App;
