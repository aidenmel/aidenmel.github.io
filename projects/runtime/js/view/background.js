var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var trees = [];
        var buildings = [];
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,"#020D1C");
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            var moon = draw.bitmap("assets/objects/moon.png");
            moon.x = 0;
            moon.y = 0;
            moon.scaleX = .8;
            moon.scaleY = .8;
            background.addChild(moon);
            
            for(var i=0; i < 100; i++){
                var circle = draw.circle(Math.random() * .8, "white", "LightGray", 2);
                circle.x = canvasWidth * Math.random();
                circle.y = groundY * Math.random();
                background.addChild(circle);
            }
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = 100 + (Math.random() * 200);
                var building = draw.rect(150, buildingHeight, "#000", "#202020", 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
              }
            
            // TODO 3: Part 1 - Add a tree
            for (var i = 0; i < 6; i++){
                
                // Variables
                var newTree = draw.bitmap("assets/objects/pine-tree.png");
                var randomScale = (Math.random() * .4);
                
                newTree.x = Math.random() * canvasWidth;
                newTree.y = groundY - (350 * (.6 + randomScale));
                newTree.scaleX = .6 + randomScale;
                newTree.scaleY = .6 + randomScale;
                // newTree.alpha = Math.random() * .8;
                background.addChild(newTree)
                trees.push(newTree)
            }

            // Bushes
            for (var i = 0; i < 8; i++){
                
                // Variables
                var newTree = draw.bitmap("assets/objects/Bush.png");
                var randomScale = (Math.random() * .4);
                
                newTree.x = Math.random() * canvasWidth;
                newTree.y = groundY -(150 * (.6 + randomScale));
                newTree.scaleX = .6 + randomScale;
                newTree.scaleY = .6 + randomScale;
                newTree.alpha = 1 - (Math.random() * .2);
                background.addChild(newTree)
                trees.push(newTree)
            }

            // Ground
            var Ground = draw.rect(canvasWidth, canvasHeight,"#000");
            Ground.y = groundY;
            background.addChild(Ground);

        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            for(var i = 0; i < trees.length; i++){
                trees[i].x = trees[i].x - 2;

                if (trees[i].x < -200){
                    trees[i].x = canvasWidth;
                }
            }

            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x = building.x - 1;
                
                if (building.x < -200){
                    building.x = canvasWidth;
                }
              }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
