var canvas = document.getElementById('canvas');
var x = 0;
var y = 0;

if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    /* Number random */
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /* Snake */
    const snake = {
        x: getRandomInt(800),   // begin
        y: getRandomInt(500),
        width: 20,
        color: '#018301',
        dead: false,
        speed: 1000,
        draw(x, y) {
            ctx.beginPath();
            ctx.fillStyle = '#FFDA01';
            ctx.fillRect(0, 0, 800, 500);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineTo(x, y);
            ctx.stroke();
            limit();
        },
    }

    /* Direcciones */
    window.addEventListener('keydown', (e) => {

        switch (e.key) {
            case 'ArrowDown':
                snake.draw(snake.x, snake.y += 10.5);
                break;
            case 'ArrowUp':
                snake.draw(snake.x, snake.y -= 10.5);
                break;
            case 'ArrowLeft':
                snake.draw(snake.x -= 10.5, snake.y);
                break;
            case 'ArrowRight':
                snake.draw(snake.x += 10.5, snake.y);
                break;
        }

    })

    /* Limites */
    const limit = () => {
        if (snake.y < 0 || snake.y > canvas.height || snake.x < 0 || snake.x > canvas.width - 10.5) {
            ctx.strokeStyle = 'red';
            snake.dead = true;
            console.log('fuera de juego');
        }
        if (snake.dead) {
            alert('juego terminado');
            snake.dead = false;
            snake.x = getRandomInt(800);
            snake.y = getRandomInt(500);
        }
    }

    
} else {
    /* unnsoported code */
    document.write('<h1>This site not support canvas. please retry in another dispositive</h1>')
}