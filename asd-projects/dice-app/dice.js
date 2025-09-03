// Variables
var Dice = [];

// Functions
function makeDot(top, left, elementID){
  $("<div>")
    .addClass('dot')
    .css('top', top + "%")
    .css('left', left + "%")
    .appendTo(elementID);
}

function rollDie($dice){
  if ($dice.data === undefined){
    $dice = $(this);
  }

  // Generates a random number
  var randomNum = Math.ceil(Math.random() * 6);

  // Empty dice
  $dice.empty();

  // Creates dots to display number
  if (randomNum === 1) {
    makeDot(50, 50, $dice); // middle middle
  } else if (randomNum === 2) {
    makeDot(25, 25, $dice); // top left
    makeDot(75, 75, $dice); // bottom right
  } else if (randomNum === 3) {
    makeDot(25, 25, $dice); // top left
    makeDot(75, 75, $dice); // bottom right
    makeDot(50, 50, $dice); // middle middle
  } else if (randomNum === 4) {
    makeDot(75, 75, $dice); // bottom right
    makeDot(25, 25, $dice); // top left
    makeDot(25, 75, $dice); // bottom left
    makeDot(75, 25, $dice); // top right
  } else if (randomNum === 5) {
    makeDot(50, 50, $dice); // middle middle
    makeDot(75, 75, $dice); // bottom right
    makeDot(25, 25, $dice); // top left
    makeDot(25, 75, $dice); // bottom left
    makeDot(75, 25, $dice); // top right
  } else if (randomNum === 6){
    makeDot(25, 25, $dice);
    makeDot(25, 75, $dice);
    makeDot(50, 25, $dice);
    makeDot(50, 75, $dice);
    makeDot(75, 25, $dice);
    makeDot(75, 75, $dice);
  }

  // Adds an animation
  var ranRotation = ((Math.random() * 80)/10) - 5;
  $dice.css({
    "opacity": 0,
    "transform": 'rotate(' + ranRotation + 'deg) translateY(4px)',
  })
  .animate({
    "opacity": 1,
  }, 200)

  setTimeout(() => {
    $dice.css({
    "transform": 'translateY(0)',
  })
  }, 200);

}

function createDie(){
  var $newDie = $("<div>")
    .addClass('die')
    .appendTo("#dice-container");
  
  Dice.push($newDie);
  $newDie.on('click', rollDie)
  rollDie($newDie)
}

function removeDie(){
  if (Dice.length > 1){
    console.log(Dice)
    Dice[Dice.length - 1].remove();
    Dice.splice(Dice.length - 1)
  }
}

// function delayColor(dice, color, delay){
//   setTimeout(() => {
//     rollDie(dice)
//   }, delay);
// }

// function setColor(){
//   var red = Math.random() * 255;
//   var green = Math.random() * 255;
//   var blue = Math.random() * 255;
  
//   for (i = 0; i < Dice.length; i++){
//     delayRoll(Dice[i], (i - 1) * 100);
//   }
// }

// Buttons

// Rolls all visible dice (w/ a slight delay)
function delayRoll(dice, delay){
  setTimeout(() => {
    rollDie(dice)
  }, delay);
}

$("#roll-all").on('click', () => {
  for (i = 0; i < Dice.length; i++){
    delayRoll(Dice[i], (i - 1) * 100);
  }
})

// Adds a new die
$('#add').on('click', createDie)

// Removes a die
$('#remove').on('click', removeDie)

// Removes a die
// $('#set-color').on('click', setColor)

// Creates a single dice on load
createDie();