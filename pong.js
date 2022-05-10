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