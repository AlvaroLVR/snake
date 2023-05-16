var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var x = 0;
var y = 0;
var random = 0;
var num = 0;
var keyPress = '';
var numero = 0;
var flag = false;
var request;
var intervalo = 1000;
var drawFlag = false;
var ejeX;
var izq;
var arriba;
var flat = .60;

/* Scenario */
/* for (i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(0, i * 20);
    ctx.lineTo(800, i * 20);
    
    ctx.moveTo(i * 20, 0);
    ctx.lineTo(i * 20, 500);
    ctx.stroke();
} */

/* Number random */
function getRandomInt(max) {
    random = (Math.floor(Math.random() * max) * 100) 
    random == 0 ? random = (Math.floor(Math.random() * max) * 100)  : random * 100 
    return random;
}

if (canvas.getContext) {
    
    /* Direcciones */
    window.addEventListener('keydown', (e) => {    
        e.key == Number(e.key) ? console.log('es un numero') : (keyPress = e.key);
        
        //console.log('se presiono una tecla',keyPress); 
        if (keyPress == 'p') {
            cancelAnimationFrame(request)  
        }
        if (keyPress == 's') {
            dibujar()
        }

        /* movimientos */
        if (keyPress == 'ArrowDown') {
            ejeX = false;
            arriba = false;
        }
        if (keyPress == 'ArrowUp') {
            ejeX = false;
            arriba = true;
        }
        if (keyPress == 'ArrowLeft') {
            ejeX = true;
            izq = true;
        }
        if (keyPress == 'ArrowRight') {
            ejeX = true;
            izq = false;
        }
    })

    /* Snake */
    const snake = {
        x: getRandomInt(8),   // begin
        y: getRandomInt(5),
        width: 20,
        color: '#018301',
        dead: false,
        velocity: 60,
    }

    /* Apple */
    const apple = {
        color: 'red',
        width: 20,
        x: getRandomInt(7),   // begin
        y: getRandomInt(4),
    }
    
    /* Limites */
    function limit (){
        if (snake.y <= 0 || snake.y >= canvas.height || snake.x <= 0 || snake.x >= canvas.width) {
            ctx.strokeStyle = 'red';
            snake.dead = true;
            console.log('fuera de juego');
            snake.velocity = 60;
        }
        if (snake.dead) {
            alert('Perdiste');
            snake.dead = false;
            snake.x = getRandomInt(8);
            snake.y = getRandomInt(5);
            apple.x = getRandomInt(8);
            apple.y = getRandomInt(5);
            ctx.clearRect(0,0,canvas.width,canvas.height)
        }
        if ((apple.x >= snake.x && snake.x >= apple.x) && (apple.y >= snake.y && snake.y >= apple.y)) {
            flat -= 0.05
            console.log('COLISION');
            apple.x = getRandomInt(8);
            apple.y = getRandomInt(5);
            snake.velocity -= Math.floor(Math.pow(60,flat));
            
            if (snake.velocity == 0 ) {
                cancelAnimationFrame(dibujar);
                alert('felicidades terminaste el juego!')
            }
            ctx.clearRect(0,0,canvas.width,canvas.height)
            //snake.color = 'red'
        }
    }

    
    const drawSnake = () => {
        ctx.lineTo(snake.x, snake.y)
        
        ctx.strokeStyle = snake.color;
        ctx.lineWidth = snake.width;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'round';

        drawFlag = true;
        /* console.log('se dibuja el snake'); */
    }

    const drawApple = () => {          
        ctx.lineTo(apple.x, apple.y);

        ctx.lineWidth = apple.width;
        ctx.strokeStyle = apple.color;
        ctx.lineCap = 'round';

        drawFlag = false;
        /* console.log('se dibuja la manzana'); */
    }

    /* draw and speed */
    function dibujar () {
        ++num;
        ctx.beginPath();   
        drawFlag ? drawApple():drawSnake();

        if (num == snake.velocity) {

            if (ejeX) {
                izq ? snake.x-=20 : snake.x+=20; 
            }
            if (!ejeX) {
                arriba ? snake.y-=20 : snake.y+=20;
            }
            console.log(snake.velocity  , 'velocidad snake ');
            num = 0;
        }
        
        ctx.stroke();
        console.log('me estoy dibujado');
        limit();

        request = requestAnimationFrame(dibujar)
    }
    
    
} else {
    /* unnsoported code */
    document.write('<h1>This site not support canvas. please retry in another dispositive</h1>')
}