//create canvas
var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//background Image
var bgImage = new Image();
var bgReady = false;
bgImage.onload = function(){
	bgReady = true;
} 
bgImage.src = "./images/background.png";

//hero image
var heroImage = new Image();
var heroReady = false;
heroImage.onload = function(){
	heroReady = true;
}
heroImage.src = "./images/hero.png";

//monster image
var monsterImage = new Image();
var monsterReady = false;
monsterImage.onload = function(){
	monsterReady = true;
}
monsterImage.src = "./images/monster.png";


//创建hero对象和monster 对象
var hero = {
	speed:256,
	x:canvas.width/2,
	y:canvas.height/2
}
var monster = {};
var monsterCaught = 0;

var keysDown = {}
addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup",function(e){
	delete keysDown[e.keyCode];
},false);

//抓到怪物之后，画面重新出现另一只怪物
var reset = function(){

	monster.x = 32+Math.random()*(canvas.width-64);
	monster.y = 32+Math.random()*(canvas.height-64);
}

/*
keycode arrow
left 37
up 38
right 39
down 40
 */
var update = function(modifier){
	var temp;
	if( 39 in keysDown){
		hero.x = modifier*hero.speed+hero.x-512>0?modifier*hero.speed+hero.x-512:modifier*hero.speed+hero.x;
	}
	if(40 in keysDown){
		hero.y = modifier*hero.speed+hero.y-480>0?modifier*hero.speed+hero.y-480:modifier*hero.speed+hero.y;
	}
	if(37 in keysDown){
		hero.x =hero.x-modifier*hero.speed>0?hero.x-modifier*hero.speed:hero.x-modifier*hero.speed+512;
	}
	if(38 in keysDown){
		hero.y = hero.y-modifier*hero.speed>0?hero.y-modifier*hero.speed:hero.y-modifier*hero.speed+480;
	}
	if(
		hero.x <= (monster.x+31) &&
		hero.x >= (monster.x-31) &&
		hero.y <= (monster.y+32) &&
		hero.y >= (monster.y-32)
		){
		monsterCaught++;
		reset();
	}
}

//draw everything
var render = function(){
	if(bgReady){
		ctx.drawImage(bgImage,0,0);
	}
	if(heroReady){
		ctx.drawImage(heroImage,hero.x,hero.y);
	}
	if(monsterReady){
		ctx.drawImage(monsterImage,monster.x,monster.y);
	}

	ctx.fillStyle="rgb(250,250,250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = 'left';
	ctx.textBaseline = "top";;
	ctx.fillText("Goblins caught"+monsterCaught,32,32);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var main = function(){
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
}

var then = Date.now();

reset();
main();
