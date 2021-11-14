var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var up = new Image();
var bottom = new Image();

bird.src = "img/bird.png";
fg.src = "img/fg.png";
bg.src = "img/bg.png";
up.src = "img/up.png";
bottom.src = "img/bottom.png";

var gap = 90;

var score = 0;

var xPos = 10;
var yPos = 150;
var grav = 1.5;

document.addEventListener('keydown', moveUp);

function moveUp() {
   yPos -= 25;
}


var pipe = [];

pipe[0] = {
   x: cvs.width,
   y: 0
}

function draw() {
   ctx.drawImage(bg, 0, 0);

   for (var i = 0; i < pipe.length; i++) {
      ctx.drawImage(up, pipe[i].x, pipe[i].y);
      ctx.drawImage(bottom, pipe[i].x, pipe[i].y + up.height + gap);
      pipe[i].x--;

      if (pipe[i].x == 125) {
         pipe.push({
            x: cvs.width,
            y: Math.floor(Math.random() * up.height) - up.height
         });
      }
      if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + up.width && (yPos <= pipe[i].y + up.height
         || yPos + bird.height >= pipe[i].y + up.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
         location.reload();
      }

      if (pipe[i].x == 5) {
         score++
      }
   }


   ctx.drawImage(fg, 0, cvs.height - fg.height);
   ctx.drawImage(bird, xPos, yPos);

   yPos += grav;

   ctx.fillStyle = "#000";
   ctx.font = "23px Verdonna";
   ctx.fillText("Счет: " + score, 10, cvs.height - 20)
   requestAnimationFrame(draw);
}
bottom.onload = draw;