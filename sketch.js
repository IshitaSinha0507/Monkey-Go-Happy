//GameState
PLAY = 1;
END = 0;
gameState = PLAY;

var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,gameOver;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
 ground = createSprite(200,350,400,10);
 
  console.log(ground.x);
  
  //Creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  score = 0;
  survivalTime = 0;
  
  
}


function draw() {
  background("lightgreen");
  
  //Displaying survivalTime
  stroke("white");
  textSize(20);
  fill("white");
  
  text("Score:"+ score,310,80);
  stroke("black");
  textSize(20);
  fill("black");
  
 
  
  text("Survival Time :"+ survivalTime,100,50);
  
  if(gameState === PLAY){
    food();
    obstacles();
    
     survivalTime = Math.ceil(frameCount/frameRate());
    
     ground.velocityX = 0;
  ground.x = ground.width/2;
    
     //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
    
     //Press space to jump
   if(keyDown("space")){
    monkey.velocityY = -12; 
  }
    //Score
    if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
  }
    //setting lifetime
    obstacleGroup.setLifetime = (-1);
    FoodGroup.setLifetime = (-1);
    
    if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
    
    
  }else if(gameState ===END){
    FoodGroup.setVelocityEach(0);
    obstacleGroup.setVelocityEach(0);
    
    //Adding text Gameover
    stroke("yellow");
  textSize(25);
  fill("blue");
    text("GameOver",150,200);
    
    
  }
    
  
 monkey.collide(ground);
 

  drawSprites();
}

function food(){
  if(frameCount % 80 === 0){
  banana = createSprite(350,200,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.y = Math.round(random(120,200)); 
  banana.velocityX = -4; 
  banana.lifetime = 90;
  
  FoodGroup.add(banana); 
  
}
}

function obstacles(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(400,330,20,20); 
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 110; 
    
    obstacleGroup.add(obstacle);
    
  }
}




