
document.addEventListener('DOMContentLoaded', (event) => {
    const score = localStorage.getItem('playerScore') || 0; // Suppose that the score is stored in localStorage
    document.getElementById('score').textContent = `Score: ${score}`;
});

function restartGame() {
    window.location.href = 'main.html'; // Remplacez 'main.html' par l'URL de votre page de jeu principale
}
