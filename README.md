```markdown
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
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with WebSocket (ws) server
- **Image Processing**: HTML5 Canvas API
- **Steganography**: Custom LSB (Least Significant Bit) implementation

## Prerequisites
- Node.js (v12 or higher)
- npm or yarn
- Modern web browser with JavaScript enabled

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install frontend dependencies**:
   ```bash
   cd stego-chat
   npm install
   ```

3. **Install server dependencies**:
   ```bash
   cd ../stego-chat-server
   npm install
   ```

## Running the Application

1. **Start the WebSocket server**:
   ```bash
   cd stego-chat-server
   node server.js
   ```

2. **Start the React application**:
   ```bash
   cd stego-chat
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Message Encoding
1. User inputs a message.
2. Message is converted to binary.
3. A random carrier image is selected.
4. Binary data is embedded in image pixels.
5. Encoded image is sent through WebSocket.

### Message Transmission
1. Encoded images are sent via the WebSocket server.
2. Server broadcasts messages to all connected clients.
3. Messages include the username and timestamp.

### Message Decoding
1. Received images are processed using the Canvas API.
2. Binary data is extracted from pixel LSBs.
3. Original message is reconstructed.
4. Message is displayed with sender information.

## Project Structure
- `/stego-chat` - React frontend application
  - `/src/components` - React components
  - `/src/utils` - Utility functions
  - `/public/images` - Carrier images
- `/stego-chat-server` - WebSocket server

## Key Components
- `ChatRoom.js` - Main chat interface
- `steganography.js` - Image steganography implementation
- `MessageInput.js` - Message input component
- `MessageList.js` - Message display component
- `server.js` - WebSocket server implementation

## Contributing
1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

## License
This project is licensed under the ISC License - see the `package.json` file for details.

## Security Considerations
While this application uses steganography to hide messages, it should not be considered a replacement for proper encryption. The WebSocket connection is unencrypted, and the steganography implementation is for educational purposes.
```

### Changes Made:
- Fixed typos (e.g., "tart" → "Start").
- Organized headings and subheadings with proper hierarchy.
- Added consistent spacing between sections.
- Formatted code blocks for better readability.
- Improved sentence flow where necessary.
