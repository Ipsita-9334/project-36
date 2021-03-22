var dog,sadDog,happyDog;
var feed, addFood;
var fedTime, lastFed;
var getFoodStock, updateFoodStock, deductFood; 

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700, 85);
  addFood.mousePressed(addFoods);

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : " + lastFeed%12 + " PM", 350, 30);
  }else if(lastFed === 0){
    text("last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed :" + lastFed + "AM", 350, 30);
  }

  fedTime = database.ref('Feed Time');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })


}

function draw() {
  background(46,139,87);
  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}