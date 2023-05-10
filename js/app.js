var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var x = 0;
var y = 0;
var random = 0;
var flag = true;

/* Scenario */
for (i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(0, i * 20);
    ctx.lineTo(800, i * 20);

    ctx.moveTo(i * 20, 0);
    ctx.lineTo(i * 20, 500);
    ctx.stroke();
}

if (canvas.getContext) {

    /* Number random */
    function getRandomInt(max) {
        random = (Math.floor(Math.random() * max) * 100)
        if (random == 0) {
            random = (Math.floor(Math.random() * max) * 100)
        }   

        return random;
    }

    /* Snake */
    const snake = {
        x: getRandomInt(8),   // begin
        y: getRandomInt(5),
        width: 20,
        color: '#018301',
        dead: false,
        speed: 1000,
        draw(x, y) {

            ctx.beginPath();
            ctx.lineTo(x, y)
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.lineCap = 'square';
            ctx.lineJoin = 'round';
            ctx.moveTo(x, y);
            ctx.stroke();
            limit();
            apple.draw();
        },
    }

    /* Apple */
    const apple = {
        color: 'red',
        width: 20,
        x: getRandomInt(7),   // begin
        y: getRandomInt(4),
        draw(x, y) {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineTo(this.x, this.y);
            ctx.lineWidth = this.width;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }

    /* Direcciones */
    window.addEventListener('keydown', (e) => {

        switch (e.key) {
            case 'ArrowDown':
                snake.draw(snake.x, snake.y += 20);
                break;
            case 'ArrowUp':
                snake.draw(snake.x, snake.y -= 20);
                break;
            case 'ArrowLeft':
                snake.draw(snake.x -= 20, snake.y);
                break;
            case 'ArrowRight':
                snake.draw(snake.x += 20, snake.y);
                break;
        }

    })

    /* Limites */
    const limit = () => {
        if (snake.y <= 0 || snake.y >= canvas.height || snake.x <= 0 || snake.x >= canvas.width) {
            ctx.strokeStyle = 'red';
            snake.dead = true;
            console.log('fuera de juego');
        }
        if (snake.dead) {
            alert('juego terminado');
            snake.dead = false;
            snake.x = getRandomInt(8);
            snake.y = getRandomInt(5);
        }

        if ((apple.x >= snake.x && snake.x >= apple.x) && (apple.y >= snake.y && snake.y >= apple.y)) {

            console.log('COLISION');
        }

    }


} else {
    /* unnsoported code */
    document.write('<h1>This site not support canvas. please retry in another dispositive</h1>')
}