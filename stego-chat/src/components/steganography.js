export default class Steganography {
  static encodeMessage(text) {
    const image = `${process.env.PUBLIC_URL}/images/image.png`;

    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        try {
          console.log("Image loaded successfully:", img.width, "x", img.height);
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const binaryText = this.stringToBinary(text);

          // Convert message length to 32-bit binary
          const lengthBinary = text.length.toString(2).padStart(32, "0");

          // First encode the length (32 bits)
          for (let i = 0; i < 32; i++) {
            imageData.data[i * 4] =
              (imageData.data[i * 4] & 0xfe) | parseInt(lengthBinary[i], 10);
          }

          // Then encode the message starting after length
          for (let i = 0; i < binaryText.length; i++) {
            const pixel = (i + 32) * 4; // Start after 32-bit header
            imageData.data[pixel] =
              (imageData.data[pixel] & 0xfe) | parseInt(binaryText[i], 10);
          }

          ctx.putImageData(imageData, 0, 0);
          const encodedImage = canvas.toDataURL("image/png");
          resolve(encodedImage);
        } catch (error) {
          reject(new Error(`Encoding failed: ${error.message}`));
        }
      };

      img.onerror = (err) => reject(err);
      img.src = image;
    });
  }

  static decode(encodedImage) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // First read length (32 bits)
        let lengthBinary = "";
        for (let i = 0; i < 32; i++) {
          const bit = imageData.data[i * 4] & 1;
          lengthBinary += bit;
        }
        const messageLength = parseInt(lengthBinary, 2);

        // Read only message bits up to length
        let binaryString = "";
        for (let i = 0; i < messageLength * 8; i++) {
          const pixel = (i + 32) * 4; // Start after 32-bit header
          const bit = imageData.data[pixel] & 1;
          binaryString += bit;
        }

        const decodedText = this.binaryToString(binaryString);
        resolve(decodedText);
      };

      img.onerror = (err) => reject(err);
      img.src = encodedImage;
    });
  }

  // Existing helper methods remain the same
  static stringToBinary(text) {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
  }

  static binaryToString(binary) {
    return binary
      .match(/.{8}/g)
      .map((byte) => String.fromCharCode(parseInt(byte, 2)))
      .join("");
  }
}
