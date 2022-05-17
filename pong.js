//Declaracion de constantes
const FRAME_PER_SECOND = 50;
const COMPUTER_LEVEL = 0.1;

const NUM_BALLS = 5;

const BG_COLOR = 'BLACK';

const FONT_COLOR = 'WHITE';
const FONT_SIZE = '45px';
const FONT_FAMILY = 'impact';

const PADDLE_RIGHT_COLOR = 'WHITE';
const PADDLE_LEFT_COLOR = 'RED';
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;

const BALL_COLOR = 'WHITE';
const BALL_RADIUS = 10;
const BALL_DELTA_VELOCITY = 0.5;
const BALL_VELOCITY = 5;

const NET_COLOR = 'WHITE';
const NET_WIDTH = 4;
const NET_HEIGHT = 10;
const NET_PADDING = 15;

//Recuperamos el canvas
const cvs = document.getElementById('pong_canvas');
const ctx = cvs.getContext('2d');

//Declaramos los objetos del juego

const playerA = {
    x: 0,
    y: cvs.height/2-PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: PADDLE_LEFT_COLOR,
    score: 0
}

const playerB = {
    x: cvs.width-PADDLE_WIDTH,
    y: cvs.height/2-PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: PADDLE_RIGHT_COLOR,
    score: 0
}

const ball = {
    x: cvs.width/2,
    y:cvs.height/2,
    radius: BALL_RADIUS,
    speed: BALL_VELOCITY,
    velocityX: BALL_VELOCITY,
    velocityY: BALL_VELOCITY,
    color: BALL_COLOR
}

const net= {
    x: cvs.width/2 - NET_WIDTH/2,
    y: 0,
    width: NET_WIDTH,
    height: NET_HEIGHT,
    padding: NET_PADDING,
    color: NET_COLOR
}

// Declaramos los jugadores

var localPlayer;
var computer;

localPlayer = playerA;
computer = playerB;

ctx.fillStyle = 'BLACK';
ctx.fillRect(0, 0, 600, 400);

ctx.fillStyle = 'WHITE';
ctx.beginPath();
ctx.arc(50, 60, 10, 0, Math.PI*2);
ctx.closePath();
ctx.fill();

ctx.fillStyle = 'BLUE';
ctx.font = "45px impact";
ctx.fillText("Saludos", 200, 200);

//HELPER Canvas -----------------------------------------------

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
}


function drawText(text, x, y, color=FONT_COLOR, fontSize=FONT_SIZE, fontFamily=FONT_FAMILY) {
    ctx.fillStyle = color;
    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.fillText(text, x, y);
}

//HELPERS PONG ----------------------------------------------------
function clearCanvas () {
    drawRect(0, 0, cvs.width, cvs.height, BG_COLOR);
}

function drawNet() {
    for(let i=0; i<=cvs.height; i+=net.padding) {
        drawRect(net.x, net.y+i, net.width, net.height, net.color);
    }
}

function drawScore() {
    drawText(localPlayer.score, 1*cvs.width/4, cvs.height/5);
    drawText(computer.score, 3*cvs.width/4, cvs.height/5);
}

function drawPaddle(paddle) {
    drawRect(paddle.x, paddle.y, paddle.width, paddle.height, paddle.color);
}

function  drawBall() {
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function collision(b, p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left &&  b.bottom > p.top && b.top < p.bottom && b.left < p.right
}

//JUEGO PONG
function updateComputer() {
    computer.y += (ball.y - (computer.y + computer.height/2)) * COMPUTER_LEVEL;
}

function update() {
    // Movemos la pelota
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //Actualizamos nuestra IA
    updateComputer();

    //Si la bola golpea los laterales del campo...
    if(ball.y+ball.radius > cvs.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    // Si la pelota golpea en alguna de las palas...
    let whatPlayer = ball.x < cvs.width/2 ? playerA : playerB;

    if(collision(ball, whatPlayer)){
        // Calculamos la nueva dirección X de la pelota
        const direction = ball.x < cvs.width/2 ? 1 : -1;

        // Calculamos la nueva dirección Y de la pelota
        let collidePoint = ball.y - (whatPlayer.y+whatPlayer.height/2);
        //Normalizamos el punto de colisión
        collidePoint = collidePoint/(whatPlayer.height/2);
        //Calculamos el ángulo en radianes
        const angleRad = collidePoint * Math.PI/4;

        //Modificar la velocidad de la pelota
        ball.velocityX = ball.speed * Math.cos(angleRad) * direction;
        ball.velocityY = ball.speed * Math.sin(angleRad);

        //cada vez que golpeamos la pala, incrementamos
        ball.speed += BALL_DELTA_VELOCITY;
    }

}
function render() {
    clearCanvas();
    drawNet();
    drawScore();
    drawPaddle(localPlayer);
    drawPaddle(computer);
    drawBall();
}

function gameLoop() {
    update();
    render();
}

function initGameLoop(){
    setInterval(gameLoop, 1000/FRAME_PER_SECOND);
}

function play() {
    initGameLoop();
}

play();
