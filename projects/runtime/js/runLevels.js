var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
        
    // Saw Blades
    for(var i = 0; i < 5; i++){
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      
      sawBladeHitZone.x = 400 + (800 * i);
      sawBladeHitZone.y = groundY - (300 * Math.random());
      game.addGameItem(sawBladeHitZone);

      var obstacleImage = draw.bitmap("assets/objects/Bird.png");
      obstacleImage.x = -25;
      obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);
    }

    function createEnemy(startX, startY, speed) {
      // Enemies
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);

      enemy.x = startX;
      enemy.y = startY;
      enemy.velocityX = -1 * speed;

      enemy.onPlayerCollision = function(){
        game.changeIntegrity(-10);
        game.increaseScore(100);
        enemy.fadeOut();
        enemy.shrink();
      };
      game.addGameItem(enemy);

    }


    createEnemy(0, groundY -15, 1);
    createEnemy(400, groundY - 10, 1);
    createEnemy(800, groundY - 100, 1);
    createEnemy(1200, groundY - 50, 1);
    function startLevel() {
      // TODO 13 goes below here
      


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
