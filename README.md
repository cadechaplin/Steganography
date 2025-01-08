# Stego Chat

A secure chat application that uses steganography to hide messages within images. Messages are encoded into the least significant bits of image pixels, making the changes imperceptible to the human eye while allowing secure communication.

## Features

- Real-time chat using WebSocket communication
- Message encryption using image steganography
- Multiple carrier images for message embedding
- Username identification for chat participants
- Timestamps for all messages
- Visual display of carrier images alongside messages

## Technology Stack

- Frontend: React.js with Tailwind CSS
- Backend: Node.js with WebSocket (ws) server
- Image Processing: HTML5 Canvas API
- Steganography: Custom LSB (Least Significant Bit) implementation

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Modern web browser with JavaScript enabled

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
2. Install frontend dependencies:
cd stego-chat
npm install
3. Install server dependencies:
cd ../stego-chat-server
npm install

## Running the Application
1. tart the WebSocket server:
cd stego-chat-server
node server.js
1. Start the React application:
cd stego-chat
npm start
3. Open http://localhost:3000 in your browser
## How It Works
Message Encoding

User inputs a message
Message is converted to binary
A random carrier image is selected
Binary data is embedded in image pixels
Encoded image is sent through WebSocket
Message Transmission

Encoded images are sent via WebSocket server
Server broadcasts messages to all connected clients
Messages include username and timestamp
Message Decoding

Received images are processed using Canvas API
Binary data is extracted from pixel LSBs
Original message is reconstructed
Message is displayed with sender info
Project Structure
/stego-chat - React frontend application
/src/components - React components
/src/utils - Utility functions
/public/images - Carrier images
/stego-chat-server - WebSocket server
Key Components
ChatRoom.js - Main chat interface
steganography.js - Image steganography implementation
MessageInput.js - Message input component
MessageList.js - Message display component
server.js - WebSocket server implementation
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
This project is licensed under the ISC License - see the package.json file for details.

Security Considerations
While this application uses steganography to hide messages, it should not be considered a replacement for proper encryption. The WebSocket connection is unencrypted, and the steganography implementation is for educational purposes.
