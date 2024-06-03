document.addEventListener('DOMContentLoaded', (event) => {
    const score = localStorage.getItem('playerScore') || 0; 
    document.getElementById('score').textContent = `Score: ${score}`;
    const level = localStorage.getItem('playerLevel') || 0; 
    document.getElementById('currentLevel').textContent = `Level: ${currentLevel}`;
});

function restartGame() {
    window.location.href = 'main.html'; 
}