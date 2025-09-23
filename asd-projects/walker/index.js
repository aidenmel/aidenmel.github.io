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

  // Tables 
  var randomNames = ["Bob", "Elizabeth", "Steven", "Mark", "Abby", "Gabe", "Chelsea", "Barnical", "James", "Shelby", "Robert", "Macy", "Sarah", "Hubert", "Patrick", "John", "superrarename"]

  // Key Assignment Variables
  var ORDER_OF_KEYS = ['up', 'left', 'down', 'right']
  var keyDirectory = {
    38: '⬆️',
    37: '⬅️',
    40: '⬇️',
    39: '➡️',
  }

  // Game Item Objects
  var GAME_STARTED = false;
  var ROUND = 0;
  var CURRENT_TAGGER;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

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
    if (GAME_STARTED){
      repositionGameItem(); // Determines new position
      detectCollisions(); // Determines boundaries & tags
      redrawGameItem(); // Sets item at new position
      checkForIdle(); // Check to see if a object has been idle 
    }
  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event) {
    for (var i = 0; i < walkers.length; i++){
      var walker = walkers[i];

      if (event){
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
      } else {
        walker.speedX = 0;
        walker.speedY = 0;
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

  // Adds multiplayer
  function createWalker(KEYS_ARRAY){
    // Create a new object for the walker
    var newWalker = {
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      obj: $("<div>").addClass('walker').appendTo("#walkers"),
      size: 50,
      color: randomColor(),
      x: (Math.random() * $("#board").width() - 50),
      y: (Math.random() * $("#board").height() - 50),
      speedX: 0,
      speedY: 0,
      speedPercent: 1,
      idleFor: 0, 
      keys: { // Keys are assigned in a designated selection screen
        LEFT: KEYS_ARRAY.LEFT,
        RIGHT: KEYS_ARRAY.RIGHT,
        UP: KEYS_ARRAY.UP,
        DOWN: KEYS_ARRAY.DOWN, 
      },
    }

    walkers.push(newWalker); // Adds to the end of the array

    // Creates a new 'player card' which appears on the start screen
    var $player_card = createPlayerCard(newWalker);
     
    // Adds a display name to walker object
    $("<h5>").text(newWalker.name).addClass('display-name').appendTo(newWalker.obj)
    
    // Hide add player button if it exceeds maximum
    if (walkers.length > 3){
      $("#add-player").hide()
    }
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function checkForIdle(){
    for (let walker of walkers){
      if (walker.speedX === 0 && walker.speedY === 0){
        if (walker.idleFor >= 500){ // idle for 5 seconds
          walker.obj.addClass('idle');
        } else {
          walker.idleFor += 1
        }
      } else {
        if (walker.obj.hasClass('idle')){
          walker.obj.removeClass('idle');
        }
        walker.idleFor = 0;
      }
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

  function createPlayerCard(newWalker){
     var $player_card = $("<li>").addClass('player-card').appendTo("#player-list")
    
      // Add icon
      var $walkerIcon = $("<div>")
        .addClass('walker-icon')
        .css('background', newWalker.color)
        .appendTo($player_card)
    
      // Color Randomizer
      .on('click', function(){
        newWalker.color = randomColor();
        $walkerIcon.css('background', newWalker.color)
        newWalker.obj.css('background', newWalker.color)
      })

      newWalker.obj.css('background', newWalker.color) // Set already assigned color

      // Creates a description
      var $desc = $("<div>").addClass('desc').appendTo($player_card)
      
        // Add name
        $("<h2>").text(newWalker.name).appendTo($desc);

        // Display controls 
        $("<p>").text('Controlled with ' 
          + (keyDirectory[newWalker.keys.UP] ? keyDirectory[newWalker.keys.UP] : String.fromCharCode(newWalker.keys.UP))
          + ', ' +  (keyDirectory[newWalker.keys.LEFT] ? keyDirectory[newWalker.keys.LEFT] : String.fromCharCode(newWalker.keys.LEFT)) 
          + ', ' + (keyDirectory[newWalker.keys.DOWN] ? keyDirectory[newWalker.keys.DOWN] : String.fromCharCode(newWalker.keys.DOWN))
          + ', ' + (keyDirectory[newWalker.keys.RIGHT] ? keyDirectory[newWalker.keys.RIGHT] : String.fromCharCode(newWalker.keys.RIGHT))
        ).appendTo($desc)

    // Adds a remove player button
    var playerNum = walkers.length 

    if (playerNum !== 1){
      $("<button>")
      .text('X')
      .appendTo($player_card)
      .on('click', function(){
        $player_card.remove();
        newWalker.obj.remove();
        walkers.splice(playerNum - 1)

        if (walkers.length <= 2){
          $("#add-player").show();
        }
      })
    }

      return $player_card;
  }
  
  function randomColor(){
    return ('hsl(' 
          +  Math.floor(Math.random() * 360) 
          + ',' + (Math.floor(Math.random() * 31) + 70)
          + '%,' + (Math.floor(Math.random() * 21) + 50)
          + '%)')
  }

  // Collision Detection
  function detectCollisions(){

    // Player Collisions (aka tagging)
    if (GAME_STARTED && GAME_STARTED !== 'Explore'){
      for (let walker of walkers){
        if (walker !== CURRENT_TAGGER){
          var deltaA = (walker.x - (CURRENT_TAGGER.x ));
          var deltaB = (walker.y - (CURRENT_TAGGER.y ));
          var distanceBetween = Math.sqrt(deltaA * deltaA + deltaB * deltaB);
          
          if (distanceBetween < 50){
            newRound(walker)
          }
        }  
      }
    }

    // Wall Collisions
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

  function createMap(){
    var screenToLandscape = ($(document).width() * $(document).height())/(540*960);

    // Add bushes
    for (var i = 0; i < screenToLandscape * (10 + (Math.random() * 10)); i++){
      var ranSize = 64 + (Math.random() * 48);

      // Creates bush
      $('<img>')
      .attr('src', 'assets/landscape/small-bush.png')
      .addClass('bush')
      .appendTo('#landscape')
      .css({
        'width': ranSize,
        'height': ranSize,
        'z-index': 2,
        'left': (Math.random() * $("#board").width() - 50),
        'top': (Math.random() * $("#board").height() - 50),
        'filter': 'drop-shadow(2px 4px 6px #2b2b2b50) brightness(120%)',
      })
    }

    // Adds rocks
    for (var i = 0; i < screenToLandscape * (8 + (Math.random() * 10)); i++){
      var ranSize = 48 + (Math.random() * 24);

      // Creates rocks
      $('<img>')
      .attr('src', 'assets/landscape/small-rock.png')
      .addClass('rock')
      .appendTo('#landscape')
      .css({
        'width': ranSize,
        'height': ranSize,
        'z-index': 1,
        'left': (Math.random() * $("#board").width() - 50),
        'top': (Math.random() * $("#board").height() - 50),
        'transform': 'rotate(' + Math.random() * 360 + 'deg)',
        'filter': 'drop-shadow(2px 4px 6px #00000050)',
      })
    }

    // Adds dirt patches
    for (var i = 0; i < screenToLandscape * ((Math.random() * 3)); i++){
      var ranSize = 64 + (Math.random() * 48);

      // Creates rocks
      $('<img>')
      .attr('src', 'assets/landscape/dirt-patch.png')
      .addClass('dirt')
      .appendTo('#landscape')
      .css({
        'width': ranSize,
        'height': ranSize,
        'z-index': 0,
        'left': (Math.random() * $("#board").width() - 50),
        'top': (Math.random() * $("#board").height() - 50),
        'transform': 'rotate(' + Math.random() * 360 + 'deg)',
      })
    }

    // Adds tree top
    for (var i = 0; i < screenToLandscape * (2 + (Math.random() * 7)); i++){
      var ranSize = 128 + (Math.random() * 128);

      // Creates trees
      $('<img>')
      .attr('src', 'assets/landscape/tree-top.png')
      .addClass('tree')
      .appendTo('#landscape')
      .css({
        'width': ranSize,
        'height': ranSize,
        'z-index': 6,
        'left': (Math.random() * $("#board").width() - 50),
        'top': (Math.random() * $("#board").height() - 50),
        'transform': 'rotate(' + Math.random() * 360 + 'deg)',
        'filter': 'brightness(1.1) saturate(3) drop-shadow(4px 8px 16px #00000050)',
      })
    }


  }


// Round System (start, end, new)

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function newRound(player_tagged){
    
    if (GAME_STARTED === false){return} else {GAME_STARTED=false} // Debounce

    // Update round
    ROUND += 1
    $("#round").text('Round ' + ROUND);

    // Assign the new tagger
    if (player_tagged){
      CURRENT_TAGGER.obj.removeClass('tagger');
      CURRENT_TAGGER = player_tagged;
      CURRENT_TAGGER.obj.addClass('tagger');
    }

    // Stops and randomize the position of the tagger
    CURRENT_TAGGER.speedX = 0;
    CURRENT_TAGGER.speedY = 0;
    CURRENT_TAGGER.x = (Math.random() * $("#board").width() - 50);
    CURRENT_TAGGER.y = (Math.random() * $("#board").height() - 50);

    // Updates avoid display
    $("#to-avoid").text(CURRENT_TAGGER.name);

    redrawGameItem(); // Sets block at new location
    handleKeyDown();

    setTimeout(() => {
      GAME_STARTED = true; // Starts the new round
    }, 1000);

  }

  function startGame(){
    GAME_STARTED = true; // Sets GAME_STARTED variable
    ROUND = 1;

    // If one player, let them roam. Otherwise enable tag!
    if (walkers.length === 1){
      GAME_STARTED = 'Explore';
      $("#round").text('Add players to enable a game of tag');
      $("#display-msg").text('Explore the map!');
    } else {

      if (!CURRENT_TAGGER){ // If there is no tagger (first round), assign a random tagger
        CURRENT_TAGGER = walkers[Math.floor(Math.random() * walkers.length)]
      }

      // Loop through all walkers and determine tagger
      for (let tagger in walkers){
        if (tagger = CURRENT_TAGGER){
          tagger.obj.addClass('tagger');
        } else {
          tagger.obj.removeClass('tagger')
        }
      }


      
      $("#to-avoid").text(CURRENT_TAGGER.name);
    } 

    createMap()



    // Hide start menu
    $(".menu-container").hide();
  }

// Key assignment functions

  // Displays the keys assigned so far
  function displayKeys(){
      $("#key-list").empty(); // Clears list
      var labelSet = false;

      for (var i = 0; i < 4; i++){ // Displays keys assigned
        if (keysAssigned[i]){
          $("<li>").text(keyDirectory[keysAssigned[i]] ? keyDirectory[keysAssigned[i]] : String.fromCharCode(keysAssigned[i])).appendTo('#key-list')
        } else {
          if (!labelSet){
            labelSet = true;
            $("#key-label").text('Press a key for movement ' + ORDER_OF_KEYS[i]);
          }
          $("<li>").text('?').appendTo('#key-list')
        }
      }
  }

  // Assigns key to new walker
  function assignNewKey(event){
    keysAssigned.push(event.which);
    
    if (keysAssigned.length === 4){

      // Create a new walker when the 4 keycode minimum is met
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
      displayKeys() // Else if under 4, display the keys
    }
  }

  // Key Assignment Event
  $("#add-player").on('click', function(){
    $("#startMenu").hide();
    $("#keyAssign").show();

    $("#key-label").text('Press a key for movement ' + ORDER_OF_KEYS[0]);
    keysAssigned = [];
    displayKeys();
  })

  // To start the game
  $("#start").on('click', startGame)

  // Always start with a single walker
  createWalker({ // First walker always has WASD controls
    LEFT: 65,
    RIGHT: 68,
    UP: 87,
    DOWN: 83, 
  }); 
}
