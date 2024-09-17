# microbit-oled-extension
tom wanted me to make this

# OLED Display Extension for MicroBit

This extension allows you to control an SSD1306 OLED display using SPI on the micro:bit. It includes functions for initializing the display, sending commands, and sending data.

## Functions

- `OLED.initializeOLED()`: Initializes the OLED display with the required settings.
- `OLED.sendCommand(command: number)`: Sends a command to the OLED display.
- `OLED.sendData(data: number)`: Sends data to the OLED display.
- `OLED.fillScreen()`: Fills the screen with all pixels turned ON.

## Usage

1. Wire the OLED display to the micro:bit:
   - GND → GND
   - VCC → 3.3V (or 5V depending on your OLED)
   - D0 (SCK) → Pin 13
   - D1 (MOSI) → Pin 15
   - RES → Pin 16
   - DC → Pin 12
   - CS → Pin 14

2. Initialize the OLED and fill the screen:

```typescript
OLED.initializeOLED();
OLED.fillScreen();
