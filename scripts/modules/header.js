//
//  header.js 
//  Aiden Melton
//
//  Controls all the unique header functionalities
//

// Variables
var $header = $("header");
var $cutout = $("#cutout");
var $bg = $("#bg");
var $cursor = $("#h-cursor");

const PIXEL_LIMITS = 2;
var PARALLAX_POS = {
    x: 0,
    y: 0,
}
var PREVIOUS_CURSOR = {
    x: 0,
    y: 0,
}

// Functions
function updateBackground(){
    $bg.css({
        'left': PARALLAX_POS.x,
        'top': PARALLAX_POS.y,
    })

    $cutout.css({
        'left': -PARALLAX_POS.x,
        'top': -PARALLAX_POS.y,
    })
}

// Events
$(document).on('mousemove', function(e){

// CURSOR EFFECT
 
    $cursor.css({
        'left': e.pageX,
        'top': e.pageY - $header.offset().top,
    })


// PARALLAX EFFECT

    // Update position
    PARALLAX_POS.x += ((PREVIOUS_CURSOR.x - e.pageX)/200);
    PARALLAX_POS.y += ((PREVIOUS_CURSOR.y - e.pageY)/200);

    // Check limits
    PARALLAX_POS.x > PIXEL_LIMITS ? PARALLAX_POS.x = PIXEL_LIMITS : PARALLAX_POS.x 
    PARALLAX_POS.x < -PIXEL_LIMITS ? PARALLAX_POS.x = -PIXEL_LIMITS : PARALLAX_POS.x

    PARALLAX_POS.y > PIXEL_LIMITS ? PARALLAX_POS.y = PIXEL_LIMITS : PARALLAX_POS.y 
    PARALLAX_POS.y < -PIXEL_LIMITS ? PARALLAX_POS.y = -PIXEL_LIMITS : PARALLAX_POS.y

    // Update background
    updateBackground();

    // Record previous position
    PREVIOUS_CURSOR.x = e.pageX;
    PREVIOUS_CURSOR.y = e.pageY;
})