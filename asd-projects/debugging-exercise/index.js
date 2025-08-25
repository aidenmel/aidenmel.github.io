$(document).ready(function () {
  
/////////////////
// initialization
/////////////////

// this section initializes some variables that will be used throughout the program
var doubleMaxSpeed = 5;
var maxGhosts = 10;
var $board = $("#board");
var boardWidth = $($board).width();
var boardHeight = $($board).height();
var ghosts = [];
var ghostRadius = 10;
// modify these values if you want faster moving ghosts or a shorter countdown timer
const FPS = 25;
const initialDelay = 5_000;

//////////
// startup
//////////

// this gets the whole thing going;
// it creates a number of ghosts both in JavaScript and in the HTML of the website
for (var i = 0; i < maxGhosts; i++) {
  var newId = getId(i);
  var newGhost = makeGhost(newId);
  ghosts.push(newGhost);

  addNewGhostElement(newGhost, newId);
}

// calling this function first starts a 5 second countdown
// after the countdown, the update function will be called repeatedly 25 times per second
startProgram();

///////////////////////////
// startup helper functions
///////////////////////////

// this creates a ghost object and returns it
// note: it only creates an object; it does not create a ghost in the HTML
function makeGhost(id) {
  // this creates an empty object
  var ghost = {};

  // this creates some useful variables that are not directly placed in the object
  var maxX = boardWidth - ghostRadius * 2;
  var maxY = boardHeight - ghostRadius * 2;

  // this gives the ghost object all of the data that it needs to store
  ghost.id = "#" + id;
  ghost.x = Math.random() * maxX + ghostRadius;
  ghost.y = Math.random() * maxY + ghostRadius;
  ghost.speedX = decideSpeed();
  ghost.speedY = decideSpeed();

  // assign a random color for the ghost's glow
  const colors = [
    "#00f",
    "#f00",
    "#0f0",
    "#ff0",
    "#0ff",
    "#f0f",
    "#fff",
    "#fa0",
    "#0a0",
    "#a0f",
  ];
  ghost.color = colors[Math.floor(Math.random() * colors.length)];

  // If mouse enters, make ghost appear briefly

  return ghost;
}

// this generates a random speed value
function decideSpeed() {
  return (Math.random() * doubleMaxSpeed) / 2 - doubleMaxSpeed;
}

// this generates an id for a ghost given the ghost's number
function getId(number) {
  return ("ghost" + number); 
}

// this adds a ghost into the HTML
function addNewGhostElement(ghost, id) {
  // this creates the HTML for a new ghost element
  var $ghost = $("<img>")
    .attr("id", id)
    .attr("src", "img/ghost.png")
    .css("left", ghost.x)
    .css("top", ghost.y)
    .addClass("ghost");

  // this inserts the ghost's HTML into your website
  $ghost.appendTo($board);
}

//////////////////
// update function
//////////////////

// this should move all of the ghosts
function update() {
  // loop over the ghosts array. We use the maxGhosts variable instead of ghosts.length
  // to make seeing issues in the debugger slightly easier (in practice, you should use
  // ghosts.length, but do NOT change it here)
  for (var i = 0; i < maxGhosts; i++) {
    var ghost = ghosts[i];

    // move the ghost
    moveGhost(ghost);

    // bounce the ghost, if it hits a wall
    bounceGhost(ghost);

    // redraw the ghost on the screen after it moves
    updateGhostOnScreen(ghost);

    // make sure the ghost is oriented correctly
    updateOrientation(ghost);
  }
}

//////////////////////////
// update helper functions
//////////////////////////

// this moves ghosts in memory but doesn't update them on the screen
function moveGhost(ghost) {
  ghost.x += ghost.speedX;
  ghost.y += ghost.speedY;
}

// Determine whether ghost is within a circle radius
var flashlightPos;

// this bounces ghosts if they hit a wall
function bounceGhost(ghost) {
  // this bounces off the left wall
  if (ghost.x < 0){
    ghost.x -= ghost.speedX;
    ghost.speedX *= -1;
  }
  // this bounces off the right wall
  else if (ghost.x > boardWidth) {
    ghost.x -= ghost.speedX;
    ghost.speedX *= -1;
  }
  // this bounces off the top wall
  if (ghost.y < 0) {
    ghost.y -= ghost.speedY;
    ghost.speedY *= -1;
  }
  // this bounces off the bottom wall
  else if (ghost.y > boardHeight) {
    ghost.y -= ghost.speedY;
    ghost.speedY *= -1;
  }
}


var cursor = document.getElementById('cursor'); // This will help dictate the location of the cursor

// this redraws the ghost's position on the screen
function updateGhostOnScreen(ghost, flashlightPos) {

  // these lines redraw the ghost's position
  $(ghost.id).css("left", ghost.x);
  $(ghost.id).css("top", ghost.y);
  $(ghost.id).css('opacity', '5%');

  // these lines add a glow around the ghost
  $(ghost.id).css("transition", "left 0.2s linear, top 0.2s linear, filter 0.2s");
  
  // If ghost is in a certain region, appear
  var flashlight = cursor.getBoundingClientRect();
  var flashlightPos = {
    x: flashlight.left,
    y: flashlight.top,
  }

  if (ghost.x > (flashlightPos.x + 24) && ghost.x < (flashlightPos.x + 104) && ghost.y < (flashlightPos.y + 24) && ghost.y > (flashlightPos.y - 104)){
    
    console.log(ghost.x, flashlightPos.x)
    console.log('y', ghost.y, flashlight.y)
    $(ghost.id).css(
      "filter",
      `drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px ${ghost.color}) drop-shadow(0 0 12px ${ghost.color})`
    );
    
    $(ghost.id).css('opacity', '100%');
  } else {
    $(ghost.id).css(
      "filter",
      `drop-shadow(0 0 4px #ffffff00) drop-shadow(0 0 8px #ffffff00) drop-shadow(0 0 12px #ffffff00)`
    );
    $(ghost.id).css('opacity', '5%');
  }
}

////////////////////////////////////////////
// DO NOT CHANGE ANY CODE BELOW THIS LINE //
////////////////////////////////////////////

// This function works just fine - do not modify!!
function updateOrientation(ghost) {
  // Default orientation
  var scaleX = 1;
  var scaleY = 1;

  // Flip horizontally if moving right
  if (ghost.speedX > 0) {
    scaleX = -1;
  } else if (ghost.speedX < 0) {
    scaleX = 1;
  }

  // Flip vertically if moving down
  if (ghost.speedY > 0) {
    scaleY = -1;
  } else if (ghost.speedY < 0) {
    scaleY = 1;
  }

  $(ghost.id).css("transform", `scaleX(${scaleX}) scaleY(${scaleY})`);
}

////////////////////////////
// setup helper functions //
////////////////////////////

// This function works just fine - do not modify!!
function startProgram() {
  var $countdown = $("<div>").attr("id", "countdown-timer").css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "red",
    "font-weight": "bold",
    "font-size": "3em",
    "text-align": "center",
    "z-index": 9999,
    "pointer-events": "none",
    width: "100%",
  });

  // Make sure #board is position: relative so absolute children are positioned inside it
  $board.css("position", "relative");
  $countdown.appendTo($board);

  var countdownSeconds = initialDelay / 1000;
  $countdown.text("Prepare your hunt...");

  var countdownInterval = setInterval(function () {
    countdownSeconds--;
    if (countdownSeconds > 0) {
      $countdown.text(countdownSeconds);
    } else {
      $countdown.text("Go!");
      clearInterval(countdownInterval);
    }
  }, 1000);

  setTimeout(startInterval, initialDelay);

  function startInterval() {
    setInterval(update, 1000 / FPS);
    $countdown.remove();
  }
}

});


// Effects
// function shakeScreen(){
//  $board.
// }

// Cursor
var timeout;

function toggleFlashlight(){
  if (cursor.classList.contains('active') === true){
    cursor.classList.remove('active');
  } else {
    cursor.classList.add('active')
  }
}

window.addEventListener('mousemove', (e) => {
  flashlightPos = e;
  clearTimeout(timeout);

  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  timeout = setTimeout(() => {
    cursor.classList.remove('active')
  }, 2000);
})

window.addEventListener('click', toggleFlashlight)