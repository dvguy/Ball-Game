// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const p = document.querySelector('p');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Shape(x,y,velX,velY,exist){
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exist = exist;
}

Shape.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);	
  ctx.fill();
}

function Ball(x, y, velX, velY, color, size, exist) {
	Shape.call(this, x,y,velY,velX, exist);
	this.color = color;
	this.size = size;

}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;


Ball.prototype.update = function() {
  if ((this.x + this.size) >= width ) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x = this.x + this.velX;
  this.y = this.y + this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x; //se elimina el la mitad del diametro de cada pelota ya que queremos sumar los radios
      var dy = this.y - balls[j].y; //de cada una de las pelotas, si sumamos x + x sumariamos ambos DIAMETROS no los radios0
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}


function Darkball(x,y,velY,velX,exist){
	Shape.call(this, x,y,20,20,exist);
	this.color = 'white';
	this.size = 10;
}

Darkball.prototype = Object.create(Shape.prototype);
Darkball.prototype = Object.create(Ball.prototype);

Darkball.prototype.constructor = Darkball;

Darkball.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 20;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);	
  ctx.stroke();
}


Darkball.prototype.update = function() {
  if ((this.x + this.size) >= width ) {
    this.x -= this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x = -(this.x);
  }

  if ((this.y + this.size) >= height) {
    this.y -= this.size;	
  }

  if ((this.y - this.size) <= 0) {
    this.y = -(this.y);
  }
}

Darkball.prototype.setControls = function(){
	let _this = this;
	window.onkeydown = function(e) {
	    if (e.key === 'a') {
	      _this.x -= _this.velX;
	    } else if (e.key === 'd') {
	      _this.x += _this.velX;
	    } else if (e.key === 'w') {
	      _this.y -= _this.velY;
	    } else if (e.key === 's') {
	      _this.y += _this.velY;
	    }
	  }
	}

var contador = 10;
p.innerHTML = p.innerHTML + contador;
var bolas = 20;

Darkball.prototype.collisionDetect = function() {
 for (var j = 0; j < balls.length; j++) {
    if (balls[j].exist === true) {
      var dx = this.x - balls[j].x; 
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exist = this.exist = false;
        p.innerHTML = "Ball Count:"+ --bolas;	
      }
    }
  }
}

var limite = random(10,20)
var Darkball_1 = new Darkball(
	random(limite, width - limite),
	random(limite, height - limite),
	20,
	20,
	'white',
	true
	);

Darkball_1.setControls();

var balls = [];

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < contador) {
    var size = random(10,20);
    var ball = new Ball(
      // la posición de las pelotas, se dibujará al menos siempre
      // como mínimo a un ancho de la pelota de distancia al borde del
      // canvas, para evitar errores en el dibujo 
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size,
      true
    );
    balls.push(ball); 
}

  for (var i = 0; i < balls.length; i++) {
  	if(balls[i].exist === true){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
  	}

  	var bolas = balls[i].exist === true;

  	Darkball_1.draw();
  	Darkball_1.collisionDetect();
  	Darkball_1.update();

  }

  requestAnimationFrame(loop);
}



loop();

/*
  while (bh.length < 1) {
    var size = random(10,20);
    var bb = new Darkball(
      random(0 + size,width - size),
      random(0 + size,height - size),
      this.color = 'red',
      size
    );
    bh.push(bb);
  }

  	for(var l = 0; l < balls.length; l++){
		for (var k = 0; k < bh.length; k++) {

	      var dx2 = bh[k].x - balls[l].x;
	      var dy2 = bh[k].y - balls[l].y;
	      var distance2 = Math.sqrt(dx2 * dx2 + dy2 *dy2);

	      	if (distance2 < bh[k].size + balls[l].size){
		      	balls[l].exist = this.exist = false;
		      	//if(balls[l].exist === false){
		      	    balls.pop(); //ver si funciona con this.ball ALSO ver si el problema esta en el ball ver ***
		      	    //numerador -=1; //INTNAR PONER DENTRO DE LOOP PARA PODER USAR BALL
		      	    //investigar un metodo alternativo al POP
		      	    numerador -= 1;
		      //	}
		}
      }
    }	


  for (var i = 0; i < bh.length; i++) {
    bh[i].draw();
  }
  validar();*/