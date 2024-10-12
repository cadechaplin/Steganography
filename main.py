from PIL import Image

def set_lsb(value, bit):
    """Set the least significant bit of value to bit (0 or 1)."""
    return (value & ~1) | bit

def stringToBinary(message):
    """Convert a string message into its binary representation."""
    return ''.join(format(ord(char), '08b') for char in message)

def binaryToString(binary):
    """Convert binary data back into a string."""
    return ''.join(chr(int(binary[i:i+8], 2)) for i in range(0, len(binary), 8))

def embedMessage(image_path, message):
    image = Image.open(image_path)
    pixels = image.load()

    # Convert message to binary
    bi = stringToBinary(message)
    biSize = len(bi)
    
    # Embed the size of the message in the first 32 pixels (32 bits)
    size_binary = format(biSize, '032b')  # Message size as 32-bit integer

    # Combine the size and message binary
    full_binary = size_binary + bi

    width, height = image.size
    total_pixels = width * height

    # Check if the message can fit in the image
    if len(full_binary) > total_pixels:
        raise ValueError("Message is too large to fit in the image")

    i = 0
    for y in range(height):
        for x in range(width):
            if i >= len(full_binary):
                return image
            r, g, b = pixels[x, y]
            r = set_lsb(r, int(full_binary[i]))  # Modify the red channel LSB
            pixels[x, y] = (r, g, b)
            i += 1
    return image

def extractMessage(image):
    pixels = image.load()
    width, height = image.size
    
    
    # Extract the first 32 bits to get the message size
    size_binary = []
    for y in range(height):
        for x in range(width):
            if len(size_binary) < 32:  # First 32 bits represent the size
                r, g, b = pixels[x, y]
                size_binary.append(str(r & 1))
            else:
                break
        if len(size_binary) >= 32:
            break

    # Convert the extracted size to an integer
    message_size = int(''.join(size_binary), 2)

    # Now extract the message using the size
    message_binary = []
    i = 0
    for y in range(height):
        for x in range(width):
            if i >= 32 and i < message_size + 32:  # Skip the first 32 bits (size info)
                r, g, b = pixels[x, y]
                message_binary.append(str(r & 1))
            i += 1
            if i >= message_size + 32:
                break
        if i >= message_size + 32:
            break

    return binaryToString(''.join(message_binary))



while(1):
    print("Enter a message or 0 to exit!")
    message = input()
    if message == "0":
        break
    else:
        image_path = 'image.png'
        # Embed the message
        embedded_image = embedMessage(image_path, message)
        embedded_image.save('embedded_image.png')
        embedded_image = Image.open('embedded_image.png')
        extracted_message = extractMessage(embedded_image)
        print("Your message: " + extracted_message)
        