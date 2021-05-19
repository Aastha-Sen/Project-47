var spacecraft,sImg;
var asteroids,aImg;
var laser,lImg;
var bImg;
var score=0;
var lasersGroup,asteroidsGroup;
var alien;
var points=0;
var gameState="lvl1";

function preload(){
  sImg=loadImage("images/spacecraft.png");
  aImg=loadImage("images/asteroid.jpg");
  lImg=loadImage("images/laser.png");
  bImg=loadImage("images/back.jpg");
  aliens=loadImage("images/alien.jpg")
}
function setup() {
  createCanvas(800,600);

  spacecraft=createSprite(400, 500, 50, 50);
  spacecraft.addImage("space",sImg);
  spacecraft.scale=0.1;

  lasersGroup=new Group();
  asteroidsGroup=new Group();
  aliensGroup=new Group();
}

function draw() {

  //homescreen code
  if(gameState==="lvl1"){
    fill("black");
    textSize(30);
    spacecraft.visible=false
    text("Welcome to the Space Fighter!!",100,200);
    text("Destroy the asteroids and try to reach moon",100,240);
    text("Press ENTER to start",150,300)

    if(keyDown("enter")){
      gameState="lvl2"
    }
  }


  //level 1 code
  if(gameState==="lvl2"){
    background(bImg);
    spacecraft.visible=true 
    
    if(keyDown("left")){
      spacecraft.x=spacecraft.x-5;
    }
    if(keyDown("right")){
      spacecraft.x=spacecraft.x+5;
    }
    if(keyDown("space")){
      spawnLasers();
      laser.velocityY=-(3+score/10);
    }
    if(lasersGroup.isTouching(asteroidsGroup)){
      score=score+5;
      lasersGroup.destroyEach();
      asteroidsGroup.destroyEach();
    }

    if(spacecraft.isTouching(asteroidsGroup)){
      gameState="over"
    }
    
    fill("white");
    textSize(30);
    text("SCORE : "+ score,500,50);
    
    if(score===5){
      gameState="lvl3";
    }

    spawnAsteroids();
  }

  //game over code
  if(gameState==="over"){
    gameOver();
  }

  //level 2 code(text part only)
  if(gameState==="lvl3"){
    background("black")
    spacecraft.visible=false;
    score.visible=false

    fill("yellow")
    noStroke();
    textSize(30)
    text("level 2 reached",250,200);
    text("In this level you have to reach moon",125,250);
    text("You can do it either by escaping aliens",125,300);
    text("or by destroying them using laser",125,345);
    text("...Press ENTER to CONTINUE...",150,500);


    if(keyDown("enter")){
      gameState="lvl4"
    }
  }

  //level 2 code (game Part)
  if(gameState==="lvl4"){
    background("black");
    camera.x=spacecraft.x
    camera.y=spacecraft.y
    fill("white");
    textSize(30);
    text("Score : "+ points,camera.x+80,camera.y-80)

    spacecraft.visible=true;
    spacecraft.scale=0.07;

    
    if(keyDown("left")){
      spacecraft.x=spacecraft.x-5;
    }
    if(keyDown("right")){
      spacecraft.x=spacecraft.x+5;
    }
    
    if(keyDown("space")){
      spawnLasers();
      laser.velocityY=-(2+score/10);
    } 
    if(lasersGroup.isTouching(aliensGroup)){
      points++;
      lasersGroup.destroyEach();
      aliensGroup.destroyEach();
    }
    if(spacecraft.isTouching(aliensGroup)){
      gameState="over"
      gameOver();
      aliensGroup.setVisibleEach(false);
    }
    spawnAliens();

    if(points===1){
      gameState="lvl5";
    }
  }

  if(gameState==="lvl5"){
    background("aqua");
    spacecraft.visible=false;
    aliensGroup.setVisibleEach(false)
    fill("magenta");
    textSize(25)
    strokeWeight(3)
    stroke("black");
    text("You reached the MOON!!",200,400);
    text("Congratulations!!",200,440);
    
  }
  
  drawSprites();
}

function spawnAsteroids(){
  if(frameCount%250===0){
   asteroids=createSprite(400,-10,50,50);
   asteroids.addImage("asteroid",aImg);
   asteroids.scale=0.07
   asteroids.velocityY=1+score/5;
   //asteroids.depth=spacecraft.depth-1;
   asteroids.x=Math.round(random(0,800));
   asteroids.lifetime=800;
   asteroidsGroup.add(asteroids);
  }
}

function spawnLasers(){ 
  laser=createSprite(400,500,50,50);
  laser.addImage("laser",lImg);
  laser.scale=0.1;
    
  laser.depth=spacecraft.depth-2;
  laser.lifetime=800;
  laser.x=spacecraft.x;
  lasersGroup.add(laser);
}

function spawnAliens(){
  if(frameCount%150===0){
    alien=createSprite(400,-10,50,50);
    alien.addImage("alien",aliens);
    alien.scale=0.04;

    alien.velocityY=1+score/5;
    alien.x=Math.round(random(0,800));
    alien.lifetime=800;
    aliensGroup.add(alien);
  }
}

function gameOver(){
    background("black")
    spacecraft.visible=false;
    score.visible=false;
    asteroidsGroup.setVisibleEach(false)
    fill("yellow")
    stroke("black")
    strokeWeight(3);
    textSize(30);
    text("GAME OVER",250,250)
}