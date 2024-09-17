// OLED Display Driver for MicroBit using SPI

//% weight=100 color=#1e4179 icon="\uf108" block="Knox SPI OLED"
namespace OLED {
    let CS = DigitalPin.P14
    let DC = DigitalPin.P12
    let RES = DigitalPin.P16

    //% block="initialise OLED display"
    export function initialiseOLED() {
        resetDisplay();

        // OLED initialisation sequence (SSD1306 controller)
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

    //% block="reset OLED display"
    export function resetDisplay() {
        pins.digitalWritePin(RES, 0);  // Pull RES low
        basic.pause(100);  // Wait 100ms
        pins.digitalWritePin(RES, 1);  // Pull RES high
    }

    //% block="send command %command"
    export function sendCommand(command: number) {
        pins.digitalWritePin(DC, 0);  // Set DC low to indicate command
        pins.digitalWritePin(CS, 0);  // Set CS low to start communication
        pins.spiWrite(command);  // Send command via SPI
        pins.digitalWritePin(CS, 1);  // Set CS high to end communication
    }

    //% block="send data %data"
    export function sendData(data: number) {
        pins.digitalWritePin(DC, 1);  // Set DC high to indicate data
        pins.digitalWritePin(CS, 0);  // Set CS low to start communication
        pins.spiWrite(data);  // Send data via SPI
        pins.digitalWritePin(CS, 1);  // Set CS high to end communication
    }

    //% block="fill screen with data"
    export function fillScreen() {
        // Fill the screen with data (all pixels ON in this case)
        for (let i = 0; i < 1024; i++) {  // For a 128x64 pixel OLED, 1024 bytes are needed
            sendData(0xFF);  // Set all pixels in each byte to 1 (white)
        }
    }
}
