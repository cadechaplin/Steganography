const WebSocket = require("ws");

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Store messages in memory
const messageHistory = [];

// Function to send message history to a client
const sendMessageHistory = (ws) => {
  messageHistory.forEach((msg) => {
    ws.send(msg);
  });
};

// When a new client connects
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send message history to new client
  sendMessageHistory(ws);

  // Listen for messages from this client
  ws.on("message", (message) => {
    try {
      // Convert Buffer to string if needed
      const messageStr = message.toString();
      console.log("Received message:", messageStr);

      // parse JSON
      JSON.parse(messageStr);

      // Store message in history
      messageHistory.push(messageStr);

      // Broadcast message
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageStr);
        }
      });
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  // When a client disconnects
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
