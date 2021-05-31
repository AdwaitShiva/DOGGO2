//Create variables here
var dog, dogHappy, foodS, foodStock, database;
var fedTime, lastFed, feed, addFood;
var foodObj;
function preload()
{
  rdog= loadImage("dogg.png")
  doggo= loadImage("doggo.png")
  
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  dog= createSprite(250,380,20,20)
  dog.addImage(rdog)
foodObj= new Food()
  dog.scale=0.3
 database= firebase.database()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  
}


function draw() {  
background(46,139,87)
textSize(22)
fill("red")
text("Milk Bottles: "+ foodS, 250,40);
textSize(15)
fill("white")
text("Press the Up Arrow Key to Feed Your Dog",100,250)
  drawSprites();
  foodObj.display();
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + "PM", 350, 30);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12AM ", 350, 30);
  }
  else {
    text("Last Feed:  " + lastFed + "AM", 350, 30);
  }
  //add styles here


}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
  function feedDog() {
    dog.addImage(doggo);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}