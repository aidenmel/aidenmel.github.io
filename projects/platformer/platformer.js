$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    for (let i = 100; i < canvas.width; i += 100) {
      createPlatform(i, canvas.height, -1, -canvas.height);
    }
    for (let i = 100; i < canvas.height; i += 100) {
      createPlatform(canvas.width, i, -canvas.width, -1);
    }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

      // Top row platforms
      createPlatform((0.25 * canvas.width) - 125, 375, 250, 10) // Aligns the platform directly in the middle w/ percentages (add-on by Aiden Melton)
      createPlatform(600, 250, 450, 10)
      createPlatform(1000, 100, 200, 10)

      // Middle row platforms
      createPlatform((0.33 * canvas.width) - 125, 500, 250, 10) // Aligns the platform directly in the middle w/ percentages (add-on by Aiden Melton)
 
      // Bottom row platforms
      createPlatform(0,600,200,150) // Aligns the platform directly in the middle w/ percentages (add-on by Aiden Melton)
      createPlatform(1075, 600, 25, 10)
      createPlatform(1185, 100, 15, 500)

      // Tall Platform
      createPlatform(200, 200, 100, 550) // Start
      createPlatform(200, 0, 100, 100)

        createPlatform(0,500,50,10)
        createPlatform(0,300,50,10)
        createPlatform(0,100,50,10)

        createPlatform(150,400,50,10)
        createPlatform(150,600,50,10)


      createPlatform(700, 600, 100, 150)
        createPlatform(700, 0, 100, 250)
      createPlatform(900, 500, 100, 250)
      createPlatform(1100, 400, 100, 10)
      createPlatform(1000, 300, 100, 10)

      createPlatform(1100, 600, 100, 150)
      // createPlatform(1300, 300, 100, 450)

      // Final Platforms
      createPlatform(1200, 600, 100, 10)
      createPlatform(1200, 400, 100, 10)
      createPlatform(1200, 200, 100, 10)


    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

      createCollectable('diamond', (0.9 * canvas.width) - (48/2), 550, 1, 1)
      // createCollectable('diamond', (0.25 * canvas.width) - (48/2), 550, 1, 1)
      createCollectable('diamond', 25/2, 0, 1, 1)

      createCollectable('diamond', (0.45 * canvas.width) - (48/2), 150, 1, 1)
      createCollectable('diamond', (0.25 * canvas.width) - (48/2), 300, 1, 1)
      createCollectable('diamond', (0.75 * canvas.width) - (48/2), 300, 1, 1)


    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

      createCannon('bottom', (0.33 * canvas.width) - (48/2), 800)
      createCannon('bottom', (0.66 * canvas.width) - (48/2), 800)
      createCannon('left', 620, 100)
      createCannon('right', 720, 100)

    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
