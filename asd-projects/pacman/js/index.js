/* global $, sessionStorage, getLevel */

$(document).ready(function(){
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// INITIALIZATION ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // HTML jQuery Objects
  var $board = $("#board");

  // Constant Variables
  var FPS = 5;
  var BOARD_WIDTH = $board.width();
  var BOARD_HEIGHT = $board.height();
  var SQUARE_SIZE = 20;
  var CLASS_ASSIGNMENTS = {
    0: 'pellet',
    1: 'wall',
    2: 'pacman',
    3: 'redGhost',
    4: 'pinkGhost',
    5: 'blueGhost',
    6: 'orangeGhost',
    7: 'ghostGate',
    9: 'emptySpace',
  }
  var NESTED_OBJECTS = ['pellet', 'pacman', 'ghost']
  var KEY_CODES = {
    68: 'LEFT',
    65: 'RIGHT',
    83: 'DOWN',
    87: 'UP',
    37: 'LEFT',
    39: 'RIGHT',
    40: 'DOWN',
    38: 'UP'
  }
  
  // other game variables
  var pacmanTimer;  // for starting/stopping the timer that draws new Pacman frames
  var ghostTimer;   // for starting/stopping the timer that draws new ghost frames
  var pacman;       // an Object to manage Pacman's $element and movement/location data
  var redGhost;     // an Object to manage the redGhost's $element and movement/location data
  var level;        // a 2D representation of the level with numbers representing walls, pellets, etc...
  var pelletsEaten = 0; // the number of pellets eaten by Pacman

  function startGame() {
    // set initial values for the global variables...
    createMaze(getLevel(1))
  
    // start the timers to draw new frames
    var timeBetweenPacmanFrames = 1000 / FPS;       // 5 frames per second
    var timeBetweenGhostFrames = 1000 / (FPS - 1);  // 4 frames per second 
    pacmanTimer = setInterval(drawNewPacmanFrame, timeBetweenPacmanFrames);
    ghostTimer = setInterval(drawNewGhostFrame, timeBetweenGhostFrames);
  
    // turn on event handlers
    $(document).on('keydown', handleKeyDown);
  }
  
  function endGame() {
    // stop the timers
    clearInterval(pacmanTimer);
    clearInterval(ghostTimer);
  
    // turn off event handlers
    $(document).off('keydown');
  }

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  // start the game
  startGame();

  /* 
  * Called once per "tick" of the pacmanTimer. This function should execute the 
  * high-level logic for drawing new frames of Pacman:
  *   
  * - determine where pacman should move to 
  * - if the next location is a wall:
  *   - don't move pacman
  * - otherwise:
  *   - move and redraw pacman
  * - if pacman is in the same location as a pellet:
  *   - "eat" the pellet by removing it from the DOM
  *   - increase the score 
  * - if pacman is in the same location as a ghost:
  *   - end the game!
  */
  function drawNewPacmanFrame() {
    
  }

  /* 
  * Called once per "tick" of the ghostTimer which is slightly slower than 
  * the pacmanTimer. This function should execute the high-level logic for 
  * drawing new frames of the ghosts:
  * 
  * - determine where the ghost should move to (it should never be a wall)
  * - move and redraw the ghost
  */
  function drawNewGhostFrame() {
    
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  function createMaze(levelArray){
    level = levelArray;

    // Loops through each row
    for (let row = 0; row < level.length; row++){
      
      // Loops through each item pew row
      for (let item = 0; item < level[row].length; item++){
        var Assignment = level[row][item];
        var classAssignment = getClassFromNum(Assignment);
        var $obj;

        if (willMove(Assignment)){ // If it moves, create a img element
          // Create img
          $obj = $("<img>").attr('src', 'img/' + classAssignment + '.png')
            .addClass('square')
            .attr('id', classAssignment)
            .appendTo($board)

          if (classAssignment === 'pacman'){
            pacman = $obj;
          }

        } else { // Else, create a regular element
          // Create element
          $obj = $("<div>").addClass('square').appendTo($board)
            .attr('id','r' + row + 'c' + item)

          // Check for nested elements
          if (isNested(classAssignment)){ // if true, create a nested element
            $("<div>").addClass(classAssignment) // Creates a nested element
              .appendTo($obj)
          } else { // Else, assign regular class
            $obj.addClass(classAssignment)
          }
        }

        // Sets a static position
        $obj.css({
          'left': item * SQUARE_SIZE,
          'top': row * SQUARE_SIZE,
        })
      }
    }
  }

  function isNested(classAssignment){
    return NESTED_OBJECTS.includes(classAssignment)
  }

  function willMove(classAssignment){
    return (classAssignment === 2 || classAssignment === 3);
  }

  function getClassFromNum(num){
    if (CLASS_ASSIGNMENTS[num]){
      return CLASS_ASSIGNMENTS[num]
    } else {
      return CLASS_ASSIGNMENTS[9];
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// EVENT HELPER FUNCTIONS //////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleKeyDown(event) {
    var keyCode = KEY_CODES[event.keyCode];

    if (keyCode){

    }
  }

});
