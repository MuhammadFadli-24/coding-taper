const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = { x: 50, y: 200, width: 30, height: 30 };
let score = 0;
let circle = { x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 15 };

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawCircle() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fill();
}

function checkCollision() {
    const distX = dino.x + dino.width / 2 - (circle.x);
    const distY = dino.y + dino.height / 2 - (circle.y);
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < circle.radius + dino.width / 2) {
        score++;
        resetCircle();
    }
}

function resetCircle() {
    circle.x = Math.random() * (canvas.width - circle.radius * 2) + circle.radius;
    circle.y = Math.random() * (canvas.height - circle.radius * 2) + circle.radius;
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    drawCircle();
    drawScore();
    checkCollision();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            dino.y -= 10;
            break;
        case 'ArrowDown':
            dino.y += 10;
            break;
        case 'ArrowLeft':
            dino.x -= 10;
            break;
        case 'ArrowRight':
            dino.x += 10;
            break;
    }
    // Mencegah dinosaurus keluar dari canvas
    dino.x = Math.max(0, Math.min(canvas.width - dino.width, dino.x));
    dino.y = Math.max(0, Math.min(canvas.height - dino.height, dino.y));
});

update();