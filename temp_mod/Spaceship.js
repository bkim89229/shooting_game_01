export class Spaceship {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.x = canvas.width / 2 - 24;
        this.y = canvas.height - 48;
        this.image = new Image();
        this.image.src = "images/spaceship.png";
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
    }

    // 우주선 이동 로직 추가
}
