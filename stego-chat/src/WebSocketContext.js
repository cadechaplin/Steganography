// WebSocketContext.js
import React, { createContext } from "react";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const socket = new WebSocket("ws://localhost:8080");

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
