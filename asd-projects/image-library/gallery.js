// Image Gallery by Aiden Melton

// Variables

    // Data
    var IMAGE_SRC = {
        photography: [
            'black.JPG',
            'blue.JPG',
            'red.JPG',
            'white.JPG',
            'yellow.JPG'
        ]
    }
    var CURRENT_INDEX = 1;
    var VIEWPORT_WIDTH = $(window).width();

    // Objects
    var $gallery = $("#gallery");
    var $quickGallery = $("#scroll-library");
    
// Core Functions
function createImage(src_link){
    var i;

    // Create new list
    var newItem = $("<li>").appendTo($quickGallery)
    
    // Create mini image
    var $thumb = $("<img>").attr('src', src_link)
        .appendTo(newItem);

    // Add to actual gallery
    var newImage = $("<li>").appendTo($gallery)
    $("<img>").attr('src', src_link)
        .appendTo(newImage)

    i = $('#gallery li').length;

    // Events
    $thumb.on('click', function(){
        indexImage(i)
    })

}

// Helper Functions
function indexImage(index, dont_animate){
    
    // Set viewport
    $gallery.animate(
    {
        left: -(VIEWPORT_WIDTH * (index - 1)),
    }, 
    !(dont_animate) ? (200 * Math.abs(CURRENT_INDEX - index)) : 0
    )

    // Update mini library
    var $target = $quickGallery.children().eq(index - 1);

    $quickGallery.animate(
    {
        left: (VIEWPORT_WIDTH/2) - ($target.position().left) - ($target.width()/2),
    },
    !(dont_animate) ? (200 * Math.abs(CURRENT_INDEX - index)) : 0
    )

    // Update index
    CURRENT_INDEX = index
}

// Events
$(window).resize(function(){
    VIEWPORT_WIDTH = $(window).width();
    indexImage(CURRENT_INDEX, true);
})

// Loop through IMAGE_SRC and create new objects
for (let CATEGORY in IMAGE_SRC){

    // Loop through category
    for (let SRC in IMAGE_SRC[CATEGORY]){
        createImage('/assets/'+ CATEGORY.toString() +'/'+ IMAGE_SRC[CATEGORY][SRC])
    } 
}