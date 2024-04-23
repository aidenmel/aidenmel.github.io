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
    function createSawblade(startX, startY, speed){
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      
      sawBladeHitZone.x = startX;
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
        // game.increaseScore(100);
        enemy.fadeOut();
        enemy.shrink();
      };
      game.addGameItem(enemy);

    }

    // Rewards
    function createReward(startX, startY, speed){
      var reward = game.createGameItem('reward', 20);
      var icon = draw.bitmap('assets/objects/star.png');
      icon.x = -25;
      icon.y = -25;
      icon.scaleX = .6;
      icon.scaleY = .6;
      reward.addChild(icon);

      reward.x = startX;
      reward.y = startY - 50;
      reward.velocityX = -1 * speed;

      reward.onPlayerCollision = function(){
        game.increaseScore(100);
        reward.fadeOut();
        reward.shrink();
      }

      game.addGameItem(reward);
    }



    function startLevel(startFrom) {
      // TODO 13 goes below here
      
        // Update level counter
        currentLevel += 1;

        // Loop through game items
        // for(levelData)
        console.log(levelData)

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


    // Markers
    function createMarker(startX, startY, speed) {
      var reward = game.createGameItem('reward', 20);
      var icon = draw.bitmap('assets/objects/finish.png');
      icon.x = -25;
      icon.y = -25;
      icon.scaleX = .6;
      icon.scaleY = .6;
      reward.addChild(icon);

      reward.x = startX;
      reward.y = startY - 50;
      reward.velocityX = -1 * speed;

      reward.onPlayerCollision = function(){
        game.increaseScore(250);
        reward.fadeOut();
        reward.shrink();
        startLevel(reward.x);
      }

      reward.OnProjectileCollision = function(){
        game.increaseScore(250);
        reward.fadeOut();
        startLevel();
      }

      game.addGameItem(reward);
    }

    createMarker(1400, groundY, 1)
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
