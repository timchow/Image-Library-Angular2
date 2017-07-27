export class RgbaPixel {
    red: number;
    green: number;
    blue: number;
    alpha: number;

    constructor(_red: number = 0, _green: number = 0, _blue: number = 0) {
        this.red = _red;
        this.green = _green;
        this.blue = _blue;
        this.alpha = 255;
    };
}
