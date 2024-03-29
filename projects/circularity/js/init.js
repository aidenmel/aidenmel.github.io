var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,

        extras = window.opspark.racket.extras,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        extras.runStartUp();

        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;
        var circles = [];

        // TODO 2 : Create a function that draws a circle 
        function drawCircle(){
            // Code to draw a circle
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
            physikz.addRandomVelocity(circle, canvas);
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 / 7 : Call the drawCircle() function 
        for (var i = 1; i <= 150; i++){
            drawCircle();
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            for (var i = 0; i < circles.length; i++){
                
                 // TODO 4 : Update the circle's position //
                physikz.updatePosition(circles[i]);

                // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
                game.checkCirclePosition(circles[i]);

                // TODO 9 : Iterate over the array

            }
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
        
                // Top
                if (circle.y + (circle.radius/2) < (0 - (circle.radius * 1.2))){
                    circle.y = canvas.height - (circle.radius/2)
                } 

                // Bottom
                if (circle.y - (circle.radius/2) > canvas.height + (circle.radius * 1.2)){
                    circle.y = -(circle.radius)
                } 

                // Left
                if (circle.x + (circle.radius/2) < 0 - (circle.radius * 1.2)){
                    circle.x = canvas.width + (circle.radius/2)
                } 

                // Right
                if (circle.x - (circle.radius/2) > canvas.width + (circle.radius * 1.2)){
                    circle.x = -(circle.radius/2)
              }

            // CURSOR COLLISIONS

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        // view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
    

        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
