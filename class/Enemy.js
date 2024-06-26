export default class Enemy {
    constructor(x, y, width, height, speed, maxLife) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.maxLife = maxLife;
        this.currentLife = maxLife;
        this.points = 10;
    }

    draw(ctx, enemiesImage) {
        ctx.drawImage(enemiesImage, this.x, this.y, this.width, this.height);

        const lifeBarWidth = this.width * (this.currentLife / this.maxLife);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - 10, lifeBarWidth, 5);
    }

    update() {
        this.y += this.speed;
    }
}
