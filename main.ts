// OLED Display Driver for MicroBit using SPI

namespace OLED {
    let CS = DigitalPin.P14
    let DC = DigitalPin.P12
    let RES = DigitalPin.P16

    // Initialize SPI (use micro:bit pins 13 for SCK and 15 for MOSI)
    pins.spiPins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13)  // MOSI = Pin 15, MISO = not used, SCK = Pin 13
    pins.spiFrequency(1000000)  // Set the baudrate to 1MHz
    pins.spiFormat(8, 0)  // Set SPI to 8 bits per transfer and SPI mode 0

    // Function to reset OLED display
    export function resetDisplay() {
        pins.digitalWritePin(RES, 0);  // Pull RES low
        basic.pause(100);  // Wait 100ms
        pins.digitalWritePin(RES, 1);  // Pull RES high
    }

    // Function to send a command to the OLED
    export function sendCommand(command: number) {
        pins.digitalWritePin(DC, 0);  // Set DC low to indicate command
        pins.digitalWritePin(CS, 0);  // Set CS low to start communication
        pins.spiWrite(command);  // Send command via SPI
        pins.digitalWritePin(CS, 1);  // Set CS high to end communication
    }

    // Function to send data to the OLED
    export function sendData(data: number) {
        pins.digitalWritePin(DC, 1);  // Set DC high to indicate data
        pins.digitalWritePin(CS, 0);  // Set CS low to start communication
        pins.spiWrite(data);  // Send data via SPI
        pins.digitalWritePin(CS, 1);  // Set CS high to end communication
    }

    // Initialize the OLED display with necessary commands
    export function initializeOLED() {
        resetDisplay();

        // OLED initialization sequence (SSD1306 controller)
        sendCommand(0xAE);  // Display OFF
        sendCommand(0xD5);  // Set Display Clock Divide Ratio/Oscillator Frequency
        sendCommand(0x80);  // Display divide ratio/oscillator frequency
        sendCommand(0xA8);  // Set Multiplex Ratio
        sendCommand(0x3F);  // 1/64 duty (for 128x64 OLED)
        sendCommand(0xD3);  // Set Display Offset
        sendCommand(0x00);  // No offset
        sendCommand(0x40);  // Set Display Start Line
        sendCommand(0x8D);  // Charge Pump Setting
        sendCommand(0x14);  // Enable charge pump
        sendCommand(0x20);  // Set Memory Addressing Mode
        sendCommand(0x00);  // Horizontal Addressing Mode
        sendCommand(0xA1);  // Set Segment Re-map (A1 or A0)
        sendCommand(0xC8);  // Set COM Output Scan Direction
        sendCommand(0xDA);  // Set COM Pins Hardware Configuration
        sendCommand(0x12);  // Alternative COM pin configuration, disable COM left/right remap
        sendCommand(0x81);  // Set Contrast Control
        sendCommand(0xCF);  // Max contrast
        sendCommand(0xD9);  // Set Pre-charge Period
        sendCommand(0xF1);  // Pre-charge period
        sendCommand(0xDB);  // Set VCOMH Deselect Level
        sendCommand(0x40);  // 0.77xVcc
        sendCommand(0xA4);  // Entire Display ON (resume from RAM content)
        sendCommand(0xA6);  // Set Normal Display (A6 = normal, A7 = inverse)
        sendCommand(0xAF);  // Display ON
    }

    // Function to fill the screen
    export function fillScreen() {
        // Fill the screen with data (all pixels ON in this case)
        for (let i = 0; i < 1024; i++) {  // For a 128x64 pixel OLED, 1024 bytes are needed
            sendData(0xFF);  // Set all pixels in each byte to 1 (white)
        }
    }
}
