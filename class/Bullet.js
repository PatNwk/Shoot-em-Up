export default class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.fillStyle = '#00f';
        ctx.fillRect(this.x, this.y, 5, 10);
        const lifeBarWidth = this.width * (this.currentLife / this.maxLife);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - 10, lifeBarWidth, 5);
    }

    update() {
        this.y -= 10;
    }
}