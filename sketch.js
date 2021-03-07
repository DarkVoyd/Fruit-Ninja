//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;
var fruitsGroup, fruit1, fruit2,fruit3,fruit4;
var aliensGroup,alien1,alien2;
var gameover_img;
var gameover_sound, knifeswoosh;

function preload(){
  
  knifeImage = loadImage("knife.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  gameover_img = loadImage("gameover.png");
  
  gameover_sound = loadSound("gameover.mp3");
  knifeswoosh = loadSound("knifeSwoosh.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  
  fruitsGroup = createGroup();
  aliensGroup = createGroup();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    
    
    //calling fruit and monster function
    var selectsprite = Math.round(random(1,2));
    
    if (selectsprite==1) {
      spawnFruits();
    }
    
    if (selectsprite==2) {
      spawnAliens();
    }
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
   if (fruitsGroup.isTouching(knife)) {
     fruitsGroup.destroyEach();
     score=score+2;
     knifeswoosh.play();
   }
    // Go to end state if knife touching enemy
      if (aliensGroup.isTouching(knife)) {
        aliensGroup.destroyEach();
        gameover_sound.play();
        gameState=END;
      }
  }
  
  if (gameState===END) {
    aliensGroup.destroyEach();
    fruitsGroup.destroyEach();
    
    knife.addImage(gameover_img);
    knife.x=300;
    knife.y=300;
    knife.scale=2;
    
    
    if (mousePressedOver(knife)) {
      score=0;
      knife.addImage(knifeImage);
      knife.scale=0.7;
      gameState=PLAY;
     
    }
  }
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function spawnFruits() {
  
  if (frameCount%60==0) {
    var fruit = createSprite(Math.round(random(50,550)),50,10,10);
    fruit.velocityY=(6+score/10);
    
    var rand = Math.round(random(1,4));
    switch(rand){
        case 1: fruit.addImage(fruit1);
        break;
        case 2: fruit.addImage(fruit2);
        break;
        case 3: fruit.addImage(fruit3);
        break;
        case 4: fruit.addImage(fruit4);
        break;
        default: break;
    }
    
    fruit.scale = 0.3;
    fruit.lifetime = 300;
    fruitsGroup.add(fruit);
    
  }
}

function spawnAliens() {
  
  if (frameCount%60==0) {
    
    var alien = createSprite(Math.round(random(50,550)),50,10,10);
    alien.velocityY=(6 + 3*score/10);
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: alien.addImage(alien1);
        break;
        case 2 : alien.addImage(alien2);
        break;
        default: break;
    }
    
    
    alien.lifetime=300;
    aliensGroup.add(alien);
  }
}
