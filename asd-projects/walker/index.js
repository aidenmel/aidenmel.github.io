/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Global Variable
  var walkers = [];
  var keysAssigned = [];

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var PIXELS_PER_FRAME = 4;

  // Game Item Objects
  var GAME_STARTED = false;

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
  $(document).on('keydown', function(e){
    if (GAME_STARTED) {
      handleKeyDown(e)
    } else {
      assignNewKey(e)
    }
  });

  $(document).on('keyup', function(e){
    if (GAME_STARTED) {
      handleKeyUp(e)
    }
  });

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
    for (var i = 0; i < walkers.length; i++){
      var walker = walkers[i];

      if (event.which === walker.keys.LEFT){
        walker.speedX = -PIXELS_PER_FRAME * walker.speedPercent;
      }

      if (event.which === walker.keys.RIGHT){
        walker.speedX = PIXELS_PER_FRAME * walker.speedPercent;
      }

      if (event.which === walker.keys.DOWN){
        walker.speedY = PIXELS_PER_FRAME * walker.speedPercent;
      }
    
      if (event.which === walker.keys.UP){
        walker.speedY = -PIXELS_PER_FRAME * walker.speedPercent;
      }
    }
  }

  function handleKeyUp(event){
    for (var i = 0; i < walkers.length; i++){
      var walker = walkers[i];
      
      if (event.which === walker.keys.RIGHT || event.which === walker.keys.LEFT){
        walker.speedX = 0;
      }
    
      if (event.which === walker.keys.UP || event.which === walker.keys.DOWN){
        walker.speedY = 0;
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function createWalker(KEYS_ARRAY){

    // Create a new object for the walker
    var newWalker = {
      obj: $("<div>").addClass('walker').appendTo("#board"),
      size: 50,
      color: '#ff0000',
      x: (Math.random() * $("#board").width() - 50),
      y: (Math.random() * $("#board").height() - 50),
      speedX: 0,
      speedY: 0,
      speedPercent: 1,
      keys: {
        LEFT: KEYS_ARRAY.LEFT,
        RIGHT: KEYS_ARRAY.RIGHT,
        UP: KEYS_ARRAY.UP,
        DOWN: KEYS_ARRAY.DOWN, 
      },
    }

    walkers.push(newWalker);
    var playerNum = walkers.length 

    // Add a player tag to start menu
    var $player_card = $("<li>").addClass('player-card').appendTo("#player-list")

      // Add icon
      $("<div>").addClass('walker-icon').css('background-color', newWalker.color).appendTo($player_card)

      // Add name
      $("<h2>").text('Player ' + (walkers.length)).appendTo($player_card);

      // Display controls 
      $("<p>").text('Controlled with ' + String.fromCharCode(newWalker.keys.UP) + ', ' + String.fromCharCode(newWalker.keys.LEFT) + ', ' + String.fromCharCode(newWalker.keys.DOWN) + ', ' + String.fromCharCode(newWalker.keys.RIGHT)).appendTo($player_card)

      // Add new remove button
      if (playerNum !== 1){
        $("<button>").text('X').appendTo($player_card).on('click', function(){
          $player_card.remove();
          newWalker.obj.remove();
          walkers.splice(playerNum - 1)

          if (walkers.length <= 2){
            $("#add-player").show();
          }
        })
      }

      // Hide add player button if it exceeds maximum
      if (walkers.length > 2){
        $("#add-player").hide()
      }
  }

  function redrawGameItem(){
    for (let walker_data of walkers){
      walker_data.obj.css({
        'left': walker_data.x,
        'top': walker_data.y,
      })
    }
  }

  function repositionGameItem(){
    for (let walker_data of walkers){
      walker_data.x += walker_data.speedX;
      walker_data.y += walker_data.speedY;
    }
  }
  
  function wallCollision(){
    for (let walker of walkers){

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
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }


  // Adding & Remove Players
  createWalker({ // Always start with one walker that has WASD controls
    LEFT: 65,
    RIGHT: 68,
    UP: 87,
    DOWN: 83, 
  }); 

  // Key assignment (for creating new walkers)
  var ORDER_OF_KEYS = ['up', 'left', 'down', 'right']

  $("#add-player").on('click', function(){
    $("#startMenu").hide();
    $("#keyAssign").show();

    $("#key-label").text('Press a key for movement ' + ORDER_OF_KEYS[0]);
          
    keysAssigned = [];
  })

  function displayKeys(){
      $("#key-list").empty(); // Clears list
      var labelSet = false;

      for (var i = 0; i < 4; i++){ // Displays keys assigned
        if (keysAssigned[i]){
          $("<li>").text(String.fromCharCode(keysAssigned[i])).appendTo('#key-list')
        } else {
          if (!labelSet){
            labelSet = true;
            $("#key-label").text('Press a key for movement ' + ORDER_OF_KEYS[i]);
          }
          $("<li>").text('?').appendTo('#key-list')
        }
      }
    }

  function assignNewKey(event){
    keysAssigned.push(event.which);

    if (keysAssigned.length === 4){

      // Create a new walker with new keycodes
      createWalker({
        UP: keysAssigned[0],
        LEFT: keysAssigned[1],
        DOWN: keysAssigned[2],
        RIGHT: keysAssigned[3],
      })  
      
      // Return to start menu
      $("#keyAssign").hide();
      $("#startMenu").show();

    } else if (keysAssigned.length < 4) {
      displayKeys()
    }
  }

  // Starting the game
  $("#start").on('click', function(){
    $("#startMenu").hide();
    GAME_STARTED = true;
  })
}
