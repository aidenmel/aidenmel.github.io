/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Global Variable
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
    speedPercent: 1,
    size: 50,
  }

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var PIXELS_PER_FRAME = 4;

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  const KEY = {
    ENTER: 13,
    LEFT: 65,
    RIGHT: 68,
    UP: 87,
    DOWN: 83,
  }

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  $(document).on('keydown', handleKeyDown);                          
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(); // Determines new position
    wallCollision(); // Determines boundaries
    redrawGameItem(); // Sets item at new position
  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event) {
    // console.log(event.which) // Debug

    if (event.which === KEY.LEFT){
      walker.speedX = -PIXELS_PER_FRAME * walker.speedPercent;
    }

    if (event.which === KEY.RIGHT){
      walker.speedX = PIXELS_PER_FRAME * walker.speedPercent;
    }

    if (event.which === KEY.DOWN){
      walker.speedY = PIXELS_PER_FRAME * walker.speedPercent;
    }
  
    if (event.which === KEY.UP){
      walker.speedY = -PIXELS_PER_FRAME * walker.speedPercent;
    }
  
  }

  function handleKeyUp(event){
    if (event.which === KEY.RIGHT || event.which === KEY.LEFT){
      walker.speedX = 0;
    }
  
    if (event.which === KEY.UP || event.which === KEY.DOWN){
      walker.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function redrawGameItem(){
    $("#walker").css({
      'left': walker.x,
      'top': walker.y,
    });
  }

  function repositionGameItem(){
    walker.x += walker.speedX;
    walker.y += walker.speedY;
  }
  
  function wallCollision(){

    // Left Boundary
    if (walker.x < 0){
      walker.speedX = 0;
      walker.x = 0;
    }

    // Right boundary
    if (walker.x > $("#board").width() - walker.size){
      walker.speedX = 0;
      walker.x = $("#board").width() - walker.size;
    }

    // Top boundary
    if (walker.y < 0){
      walker.speedY = 0;
      walker.y = 0;
    }

    // Bottom boundary
    if (walker.y > $("#board").height() - walker.size){
      walker.speedY = 0;
      walker.y = $("#board").height() - walker.size;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
