var balloon,balloonImage1,balloonImage2;
var database,balloonposition

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup() {
  database=firebase.database();
 balloonposition = database.ref('balloon/height');
  balloonposition.on("value",readPosition,showError);
  createCanvas(1500,700);

  balloon=createSprite(100,400,20,20);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(10,0)
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale-0.01
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.01
    
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updatePosition(x,y){
  database.ref('balloon/height').set({
    'x':balloon.x+x,
    'y':balloon.y+y
  })
}
function readPosition(data){
  height = data.val();
  balloon.x = height.x
  balloon.y = height.y;
}
function showError(){
  console.log("Error in writing to the database");
}
