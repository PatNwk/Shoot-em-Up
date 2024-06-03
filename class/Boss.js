export default class Boss {
    constructor(x, y, width, height, speed, life, canvas) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.maxLife = life; // Vie maximale
        this.currentLife = life; // Vie actuelle
        this.canvas = canvas;
        this.directionX = 1;
        this.directionY = 1;
    }

    update() {
        this.x += this.speed * this.directionX;
        this.y += this.speed * this.directionY;

        if (this.x <= 0 || this.x + this.width >= this.canvas.width) {
            this.directionX *= -1;
        }
        if (this.y <= 0 || this.y + this.height >= this.canvas.height) {
            this.directionY *= -1;
        }
    }

    draw(ctx, image) {
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
        
        const lifeBarWidth = this.width * (this.currentLife / this.maxLife);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 10, this.width, 5); 
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - 10, lifeBarWidth, 5); 
    }
}
