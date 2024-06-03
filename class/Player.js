export default class Player {
    constructor(x, y, width, height, speed, playerlife, maxLife) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.playerlife = playerlife;
        this.maxLife = maxLife;
        this.speedX = 0;
        this.speedY = 0;
        this.score = 0;
        this.level = 0;
    }

    draw(ctx, playerImage) {
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);

        // Calculer la largeur de la barre de vie en fonction de la vie actuelle du joueur
        const lifeBarWidth = this.width * (this.playerlife / this.maxLife);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - 10, lifeBarWidth, 5);

        // Dessiner le contour de la barre de vie
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x, this.y - 10, this.width, 5);
    }

    update(canvas) {
        this.x += this.speedX;
        this.y += this.speedY;

        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
    }
}
