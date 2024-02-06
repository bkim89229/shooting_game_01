export class Bullet {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.alive = true;
        this.image = new Image();
        this.image.src = "images/bullet.png";
    }

    update() {
        this.y -= 7;
        if (this.y < 0) this.alive = false;
    }

    draw() {
        if (this.alive) {
            this.ctx.drawImage(this.image, this.x, this.y);
        }
    }
}
