export class Enemy {
    constructor(canvas, speed) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.speed = speed;
        this.x = Math.random() * (canvas.width - 48);
        this.y = 0;
        this.image = new Image();
        this.image.src = "images/enemy.png"; // 초기 이미지 설정
    }

    update() {
        this.y += this.speed;
        // 적군 업데이트 로직 추가
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}
