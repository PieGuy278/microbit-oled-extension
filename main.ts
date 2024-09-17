// OLED Display Driver for MicroBit using SPI

//% weight=100 color=#1e4179 icon="\uf108" block="Knox SPI OLED"
namespace OLED {

    let CS = DigitalPin.P14;
    let DC = DigitalPin.P12;
    let RES = DigitalPin.P16;

    //% block="initialize OLED"
    export function initializeOLED() {
        basic.showString("OLED Init");
    }

    //% block="reset OLED"
    export function resetDisplay() {
        basic.showString("OLED Reset");
    }

    //% block="show text %text" weight=90
    export function showText(text: string) {
        basic.showString(text);
    }
}
