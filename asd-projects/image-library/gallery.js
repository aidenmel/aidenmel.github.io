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
    var HIDDEN_MODE = false;

    // Objects
    var $gallery = $("#gallery");
    var $quickGallery = $("#scroll-library");

    // Tables
    var DaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursady', 'Friday', 'Saturday']
    var listData = {};

// Core Functions
function createImage(src_link){
    var i;

// Create objects

    // Create new list
    var $newItem = $("<li>").appendTo($quickGallery)
    
    // Create mini image
    var $thumb = $("<img>").attr('src', src_link)
        .appendTo($newItem);

    // Add to actual gallery
    var $newImage = $("<li>").appendTo($gallery)
    $("<img>").attr('src', src_link)
        .appendTo($newImage)

    i = $('#gallery li').length;

    // Events
    $thumb.on('click', function(){
        indexImage(i)
    })

    $newImage.on('click', function(){
        if (HIDDEN_MODE === true){
            $("#top-bar").removeClass('hide');
            $("#actions").removeClass('hide');
        } else {
            $("#top-bar").addClass('hide');
            $("#actions").addClass('hide');
        }
        HIDDEN_MODE = !HIDDEN_MODE
    })

// Get data

    listData[i] = {
        name: '',
        dayModified: '...',
        timeModified: '...',
    }

    var XHR = new XMLHttpRequest(); // starts a XML request
    XHR.open('HEAD', src_link, true); // XML setup
    XHR.onreadystatechange = function(){
        if (XHR.readyState === 4 && XHR.status === 200){ // If the image is loaded & data is ready to be collected
            var lastModified = XHR.getResponseHeader('Last-Modified')
            if (lastModified){
                var date = new Date(lastModified) // Helps with formatting the date
                listData[i].dayModified = DaysOfWeek[date.getDay()];
                listData[i].timeModified = date.getHours() + ':' + date.getMinutes() + ' ' + (date.getHours() < 12 ? 'AM' : 'PM');
            } else {
                listData[i].dayModified = 'unknown';
                listData[i].timeModified = 'unknown';
            }
        }
    };  
    XHR.send(); // Sends request

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

    // Update details
    console.log(listData)
    $("#date").text(listData[index - 1].dayModified);
    $("#time").text(listData[index - 1].timeModified)

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

// Loop through quick gallery to make scale effect
setInterval(() => {
    $("#scroll-library").children().each(function(){
        // Calculate distance from center
        var distanceFromCenter = Math.abs(($(this).offset().left + $(this).width()/2) - (VIEWPORT_WIDTH/2))

        if (distanceFromCenter < 100){
            $(this).height((48 + ((1 - (distanceFromCenter/200)) * 8)))
        } else {
            $(this).height(48)
        }
    })
}, 50);

indexImage(CURRENT_INDEX, true) // Start with current index