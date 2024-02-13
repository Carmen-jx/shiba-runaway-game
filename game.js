 //board
 let board;
 let width = 750;
 let height = 250;
 let context;


 //shiba
 let shibaW= 88;
 let shibaH= 94;
 let shibaX = 50;
 let shibaY = 182;
 let shibaImg;

 let shiba = {
    x : shibaX,
    y : shibaY,
    width : shibaH,
    height : shibaH
 }

 //choco
 let chocoArray = [];

 let chocoWidth= 150;
 let chocoHeight= 120;

 let chocoX= 700;
 let chocoY= height - chocoHeight

 let chocoImg;

 let ctx;
 
 //physics for movement
let velocityX = -8 // choco moving left speed
let velocityY = 0;
let gravity = 0.4;

let gameOver= false;
score = 0

 window.onload = function(){
    board = document.getElementById("board");
    board.height= height;
    board.width = width;

    context = board.getContext("2d");

    context.lineWidth = "2";
    context.strokeStyle = "red";



   shibaImg = new Image();
   shibaImg.src = "./image/stand.png"
   shibaImg.onload = function () {
    context.drawImage(shibaImg, shiba.x, shiba.y, shiba.width, shiba.height);
   }

   chocoImg= new Image();
   chocoImg.src= "./image/choco.png"

   requestAnimationFrame(update)
   setInterval(displayChoco, 1000)
   document.addEventListener("keydown", moveShiba)
  
 }

 function update() {   
   

   requestAnimationFrame(update);

   if(gameOver){
      return;
   }


   //shiba movement
   velocityY += gravity;
   shiba.y = Math.min(shiba.y + velocityY, shibaY); //apply gravity to current shiba making sure it doesnt exceed the gravity

    context.clearRect(0,0, width, height)
    
 

   //drawing shiba image
    context.drawImage(shibaImg, shiba.x, shiba.y, shiba.width, shiba.height);


    //drawing choco array 
    for (let i=0; i< chocoArray.length; i++){
      let choco = chocoArray[i];
      choco.x += velocityX;
      context.drawImage(choco.img, choco.x, choco.y, choco.width, choco.height);

      

      if(detectCollision(shiba, choco)){
         gameOver = true;
         //shibaImg.src = "./image/dead.png";
         shibaImg.onload = function (){
            context.drawImage(shibaImg, shiba.x, shiba.y, shiba.width, shiba.height);
         }
         console.log(shiba.x, shiba.y, choco.x, choco.y, choco.width, choco.height)
      }
    }

 }

 function displayChoco(){

   if(gameOver){
      return;
   }

   let choco = {
      img: chocoImg,
      x : chocoX,
      y: null,
      width : null,
      height: chocoHeight
   }

   let placeChocoChance = Math.random();

   if (placeChocoChance > .90){
      choco.y = chocoY+ 100;
      choco.width = chocoWidth + 150
      chocoArray.push(choco);
   }else if (placeChocoChance > .70){
      choco.y = chocoY + 20;
      choco.width = chocoWidth + 100
      chocoArray.push(choco);
   }else if ( placeChocoChance > .50){
      choco.y = chocoY;    
      choco.width = chocoWidth;
      chocoArray.push(choco);
   }
   if (chocoArray.length > 5){
      chocoArray.shift(); //removes first element from array so it doesn't constantly grows
   }
 }

 function moveShiba (e){
   if(gameOver){
      return;
   }

   if(e.code == 'Space' || e.code =="ArrowUp" && shiba.y ==shibaY){
      //jump
      velocityY = -10;

   } 
 }

 function detectCollision(a,b) {
   return a.x < b.x + 50 &&  //a's top left corner doesn't reach b's top right corner
          a.x > b.x &&  //a's top right corner doesn't reach b's top left corner
          a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
          a.y - 40 > b.y;   //a's bottom left corner doesn't reach b's top left corner
 }   