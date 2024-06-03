// Import des classes nécessaires
import Player from '../class/Player.js';
import Bullet from '../class/Bullet.js';
import Enemy from '../class/Enemy.js';
import Enemy2 from '../class/Enemy2.js';
import Boss from '../class/Boss.js';

// Configuration du canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Paramètres du joueur et des entités du jeu
const playerWidth = 150;
const playerHeight = 150;
let player;
let bullets = [];
let enemies = [];
let enemies2 = [];
let boss = [];
const enemyDeathheight = 200;
const enemyDeathwidth = 200;
const animationDuration = 200;
let gameOver = false; 
let win = false; 
let bossCreated = false;

// Chargement des images
const playerImage = new Image();
playerImage.src = '../img/output.png';

const enemiesImage = new Image();
enemiesImage.src = '../img/méchant.png';

const enemies2Image = new Image();
enemies2Image.src = '../img/méchant2.png';

const bossImage = new Image();
bossImage.src = '../img/IMG_6957.png';

// Configuration des niveaux
const levels = [
    { score: 0, enemySpeed: 2, enemyHealth: 5, enemySpawnRate: 2000, enemy2SpawnRate: 5000000000000000 },
    { score: 300, enemySpeed: 3, enemyHealth: 15, enemySpawnRate: 1500, enemy2SpawnRate: 4000 },
    { score: 600, enemySpeed: 4, enemyHealth: 25, enemySpawnRate: 1000, enemy2SpawnRate: 2000 },
    { score: 900, enemySpeed: 4, enemyHealth: 25, enemySpawnRate: 900, enemy2SpawnRate: 1000 },
];

let currentLevel = 0;

// Création du joueur
function createPlayer() {
    const x = canvas.width / 2 - playerWidth / 2;
    const y = canvas.height - playerHeight - 10;
    const speed = 20;
    const playerlife = 10; 
    const maxLife = 10;    
    return new Player(x, y, playerWidth, playerHeight, speed, playerlife, maxLife);
}

// Création d'une balle
function createBullet() {
    bullets.push(new Bullet(player.x + player.width / 2 - 2.5, player.y));
}

// Création d'un ennemi
function createEnemy() {
    const enemyWidth = 70;
    const enemyHeight = 70;
    const enemyX = Math.random() * (canvas.width - enemyWidth);
    const enemyY = -enemyHeight;
    const enemySpeed = levels[currentLevel].enemySpeed;
    const enemyLife = levels[currentLevel].enemyHealth;
    const newEnemy = new Enemy(enemyX, enemyY, enemyWidth, enemyHeight, enemySpeed, enemyLife);
    enemies.push(newEnemy);
}

// Création d'un second type d'ennemi
function createEnemy2() {
    const enemyWidth = 110;
    const enemyHeight = 110;
    const enemyX = Math.random() * (canvas.width - enemyWidth);
    const enemyY = -enemyHeight;
    const enemySpeed = levels[currentLevel].enemySpeed;
    const enemyLife = levels[currentLevel].enemyHealth;
    const newEnemy2 = new Enemy2(enemyX, enemyY, enemyWidth, enemyHeight, enemySpeed, enemyLife);
    enemies2.push(newEnemy2);
}

// Création du boss
function createBoss() {
    const bossWidth = 200;
    const bossHeight = 200;
    const bossX = Math.random() * (canvas.width - bossWidth);
    const bossY = Math.random() * (canvas.height - bossHeight);
    const bossSpeed = levels[currentLevel].enemySpeed;
    const bossLife = 150;
    const newBoss = new Boss(bossX, bossY, bossWidth, bossHeight, bossSpeed, bossLife, canvas);
    boss.push(newBoss);
}

// Vérification du passage au niveau supérieur
function checkLevelUp() {
    if (player.score >= levels[currentLevel + 1]?.score) {
        currentLevel++;
        clearInterval(enemyInterval);
        clearInterval(enemy2Interval);
        enemyInterval = setInterval(createEnemy, levels[currentLevel].enemySpawnRate);
        enemy2Interval = setInterval(createEnemy2, levels[currentLevel].enemy2SpawnRate);
    }
}

// Gestion des collisions entre le joueur et les ennemis
function playerTouchedByEnemy() {
    enemies.forEach((enemy) => {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            player.playerlife--;
            enemies.splice(enemies.indexOf(enemy), 1); 
            if (player.playerlife <= 0) {
                gameOver = true; 
            }
        }
    });

    enemies2.forEach((enemy2) => {
        if (
            player.x < enemy2.x + enemy2.width &&
            player.x + player.width > enemy2.x &&
            player.y < enemy2.y + enemy2.height &&
            player.y + player.height > enemy2.y
        ) {
            player.playerlife = player.playerlife - 2;
            enemies2.splice(enemies2.indexOf(enemy2), 1); 
            if (player.playerlife <= 0) {
                gameOver = true; 
            }
        }
    });

    boss.forEach((boss) => {
        if (
            player.x < boss.x + boss.width &&
            player.x + player.width > boss.x &&
            player.y < boss.y + boss.height &&
            player.y + player.height > boss.y
        ) {
            player.playerlife = player.playerlife - 10; 
            if (player.playerlife <= 0) {
                gameOver = true; 
            }
        }
    });
}

// Vérification des collisions entre les balles et le boss
function checkCollision3(bullet, boss) {
    if (
        bullet.x < boss.x + boss.width &&
        bullet.x + 5 > boss.x &&
        bullet.y < boss.y + boss.height &&
        bullet.y + 10 > boss.y
    ) {
        return true;
    }
    return false;
}

// Vérification des collisions entre les balles et les ennemis
function checkCollision(bullet, enemy) {
    if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + 5 > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + 10 > enemy.y
    ) {
        return true;
    }
    return false;
}

// Vérification des collisions entre les balles et les ennemis de type 2
function checkCollision2(bullet, enemy2) {
    if (
        bullet.x < enemy2.x + enemy2.width &&
        bullet.x + 5 > enemy2.x &&
        bullet.y < enemy2.y + enemy2.height &&
        bullet.y + 10 > enemy2.y
    ) {
        return true;
    }
    return false;
}

// Dessin de l'animation de la mort des ennemis
function drawDeathAnimation(x, y) {
    const deathFrames = [];
    for (let i = 1; i <= 6; i++) {
        const frame = new Image();
        frame.src = `../img/frame-${i}.gif`;
        deathFrames.push(frame);
    }

    const frameDuration = animationDuration / deathFrames.length;
    let frameIndex = 0;

    function animateFrame() {
        if (frameIndex < deathFrames.length) {
            ctx.clearRect(x, y, enemyDeathwidth, enemyDeathheight);
            ctx.drawImage(deathFrames[frameIndex], x - (enemyDeathwidth / 2), y - (enemyDeathheight / 2), enemyDeathwidth, enemyDeathheight);
            frameIndex++;
            setTimeout(() => {
                requestAnimationFrame(animateFrame);
            }, frameDuration);
        } else {
            ctx.clearRect(x - (enemyDeathwidth / 2), y - (enemyDeathheight / 2), enemyDeathwidth, enemyDeathheight);
        }
    }

    animateFrame();
}

// Fonction qui représente la boucle principale du jeu.
// Elle met à jour et dessine les éléments du jeu, gère les collisions et les événements de fin de jeu.
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gestion de la fin du jeu
    if (gameOver) {
        localStorage.setItem('playerScore', player.score); 
        localStorage.setItem('playerLevel', player.currentLevel);
        window.location.href = 'gameover.html';
        return;
    }

    // Gestion de la victoire
    if (win) {
        localStorage.setItem('playerScore', player.score);
        localStorage.setItem('playerLevel', currentLevel);
        window.location.href = 'win.html';
        return;
    }

    // Initialisation du joueur
    if (!player) {
        player = createPlayer();
    }

    // Mise à jour et dessin du joueur
    player.update(canvas);
    player.draw(ctx, playerImage);

    // Mise à jour et dessin des balles
    bullets.forEach((bullet) => {
        bullet.update();
        bullet.draw(ctx);
    });

    // Suppression des balles hors de l'écran
    bullets = bullets.filter((bullet) => bullet.y > 0);

    // Mise à jour et dessin des ennemis
    enemies.forEach((enemy) => {
        enemy.update();
        enemy.draw(ctx, enemiesImage);
    });

    // Mise à jour et dessin des ennemis de type 2
    enemies2.forEach((enemy2) => {
        enemy2.update();
        enemy2.draw(ctx, enemies2Image);
    });

    // Mise à jour et dessin du boss
    boss.forEach((boss) => {
        boss.update();
        boss.draw(ctx, bossImage);
    });

    // Gestion des collisions entre les balles et les ennemis
    enemies.forEach((enemy) => {
        bullets.forEach((bullet) => {
            if (checkCollision(bullet, enemy)) {
                player.score += enemy.points;
                enemy.currentLife--;
                if (enemy.currentLife <= 0) {
                    drawDeathAnimation(enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2));
                    enemies.splice(enemies.indexOf(enemy), 1);
                }
            }
        });
    });

    // Gestion des collisions entre les balles et les ennemis de type 2
    enemies2.forEach((enemy2) => {
        bullets.forEach((bullet) => {
            if (checkCollision2(bullet, enemy2)) {
                player.score += enemy2.points;
                enemy2.currentLife = enemy2.currentLife - 1;
                if (enemy2.currentLife <= 0) {
                    drawDeathAnimation(enemy2.x + (enemy2.width / 2), enemy2.y + (enemy2.height / 2));
                    enemies2.splice(enemies2.indexOf(enemy2), 1);
                }
            }
        });
    });

    // Gestion des collisions entre les balles et le boss
    boss.forEach((boss) => {
        bullets.forEach((bullet) => {
            if (checkCollision3(bullet, boss)) {
                boss.currentLife--; 
                if (boss.currentLife <= 0) {
                    win = true;
                }
            }
        });
    });

    // Suppression des balles hors de l'écran
    bullets = bullets.filter((bullet) => bullet.y > 0);

    // Création du boss si le score du joueur atteint 10000 et que le boss n'a pas encore été créé
    if (player.score >= 10000 && !bossCreated) {
        createBoss();
        bossCreated = true;
    }

    // Dessin des étoiles sur le fond de l'écran
    for (let i = 0; i < 1000; i++) {
        const radius = Math.random() * 2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(255, 255, 255, ${Math.random() * 0.5})`;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    // Gestion des collisions entre le joueur et les ennemis
    playerTouchedByEnemy();

    // Vérification du passage au niveau supérieur
    checkLevelUp(); 

    // Affichage du score et du niveau
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial bold';
    ctx.fillText(`Score: ${player.score}`, 10, 60);
    ctx.fillText(`Level: ${currentLevel}`, 10, 90);

    // Requête d'animation pour la prochaine frame
    requestAnimationFrame(gameLoop);
}

// Chargement des images et démarrage de la boucle de jeu
playerImage.onload = () => {
    enemiesImage.onload = () => {
        enemies2Image.onload = () => {
            bossImage.onload = () => {
                gameLoop();
            };
        };
    };
};

// Gestion des événements de pression de touches pour le déplacement et le tir du joueur
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.speedX = -player.speed;
    } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.speedX = player.speed;
    } else if (event.key === 'ArrowUp' && player.y > 0) {
        player.speedY = -player.speed;
    } else if (event.key === 'ArrowDown' && player.y < canvas.height - player.height) {
        player.speedY = player.speed;
    } else if (event.key === ' ') {
        createBullet();
    }
});

// Gestion des événements de relâchement de touches pour arrêter le déplacement du joueur
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        player.speedX = 0;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        player.speedY = 0;
    }
});

// Intervalles de création d'ennemis
let enemyInterval = setInterval(createEnemy, levels[currentLevel].enemySpawnRate);
let enemy2Interval = setInterval(createEnemy2, levels[currentLevel].enemy2SpawnRate);
