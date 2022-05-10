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

//Declaramos los objetos del juego

const playerA = {
    x: 0,
    y: cvs.height/2-PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    color: PADDLE_LEFT_COLOR,
    score: 0
}

const playerB = {
    x: cvs.width-PADDLE_WIDTH,
    y: cvs.height/2-PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
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
    x: cvs.width - NET_WIDTH/2,
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

//Recuperamos el canvas
const csv = document.getElementById('pong_canvas');
const ctx = csv.getContext('2d');


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

  drawRect(0, 0, csv.clientWidth, csv.clientHeight, 'BLACK');
  drawCircle(60, 80, 10, 'WHITE');
  drawText('SALUDOS!!!', 200, 200);
