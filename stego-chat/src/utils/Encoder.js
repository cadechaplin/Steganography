const fs = require("fs");
const { PNG } = require("pngjs");

class ImageSteganography {
  /**
   * Converts a string to its binary representation
   * @param {string} str - Input string to convert
   * @returns {string} Binary string representation
   */
  static stringToBinary(str) {
    return str
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
  }

  /**
   * Converts a binary string back to text
   * @param {string} binary - Binary string to convert
   * @returns {string} Decoded text
   */
  static binaryToString(binary) {
    const bytes = binary.match(/.{1,8}/g) || [];
    return bytes.map((byte) => String.fromCharCode(parseInt(byte, 2))).join("");
  }

  /**
   * Encodes a message into a PNG image
   * @param {string} message - Message to encode
   * @param {string} inputImagePath - Path to input PNG image
   * @returns {Promise<Buffer>} Buffer containing the encoded image
   */
  static async encodeMessage(message) {
    const inputImagePath = "./images/image.png";
    try {
      // Add message length as header (32 bits) for proper decoding
      const messageLength = message.length.toString(2).padStart(32, "0");
      const binary = messageLength + this.stringToBinary(message);
      return await this.encodeBinaryStringInImageToBuffer(
        inputImagePath,
        binary
      );
    } catch (error) {
      throw new Error(`Failed to encode message: ${error.message}`);
    }
  }

  /**
   * Decodes a message from an encoded PNG image
   * @param {Buffer} imageBuffer - Buffer containing the encoded image
   * @returns {Promise<string>} Decoded message
   */
  static async decodeMessage(imageBuffer) {
    try {
      const binary = await this.decodeBinaryFromImage(imageBuffer);
      // Extract message length from header
      const messageLength = parseInt(binary.slice(0, 32), 2);
      const messageBinary = binary.slice(32, 32 + messageLength * 8);
      return this.binaryToString(messageBinary);
    } catch (error) {
      throw new Error(`Failed to decode message: ${error.message}`);
    }
  }

  /**
   * Encodes a binary string into the LSB of image pixels
   * @private
   */
  static async encodeBinaryStringInImageToBuffer(inputImagePath, binaryString) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(inputImagePath)
        .pipe(new PNG())
        .on("parsed", function () {
          // Check if image has enough capacity
          if (binaryString.length > this.width * this.height) {
            reject(new Error("Message too large for image capacity"));
            return;
          }

          let binaryIndex = 0;
          for (
            let y = 0;
            y < this.height && binaryIndex < binaryString.length;
            y++
          ) {
            for (
              let x = 0;
              x < this.width && binaryIndex < binaryString.length;
              x++
            ) {
              const idx = (this.width * y + x) << 2;
              const bit = binaryString[binaryIndex] === "1" ? 1 : 0;
              // Modify only the least significant bit
              this.data[idx] = (this.data[idx] & 0xfe) | bit;
              binaryIndex++;
            }
          }

          const chunks = [];
          this.pack()
            .on("data", (chunk) => chunks.push(chunk))
            .on("end", () => resolve(Buffer.concat(chunks)))
            .on("error", reject);
        })
        .on("error", reject);
    });
  }

  /**
   * Decodes binary string from an image buffer
   * @private
   */
  static async decodeBinaryFromImage(imageBuffer) {
    try {
      const png = PNG.sync.read(imageBuffer);
      let binaryString = "";

      // Extract bits until we have enough for the message (based on header)
      for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
          const idx = (png.width * y + x) << 2;
          binaryString += png.data[idx] & 0x01;

          // After getting the header (32 bits), we can determine total length needed
          if (binaryString.length === 32) {
            const messageLength = parseInt(binaryString, 2);
            const totalBitsNeeded = 32 + messageLength * 8;
            if (totalBitsNeeded > png.width * png.height) {
              throw new Error("Invalid message length in header");
            }
          }
        }
      }
      return binaryString;
    } catch (error) {
      throw new Error(`Failed to decode binary from image: ${error.message}`);
    }
  }
}

// Example usage:
async function test() {
  try {
    const message = "Hello, steganography!";
    console.log("Original message:", message);

    const encodedImage = await ImageSteganography.encodeMessage(message);

    // Save encoded image (optional)
    fs.writeFileSync("./images/encoded.png", encodedImage);

    const decodedMessage = await ImageSteganography.decodeMessage(encodedImage);
    console.log("Decoded message:", decodedMessage);

    if (message === decodedMessage) {
      console.log("Success! Message encoded and decoded correctly.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
//test();
// Export the class for use as a module
module.exports = ImageSteganography;
