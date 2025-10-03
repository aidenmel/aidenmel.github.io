// Image Gallery by Aiden Melton

// Variables

    // Data
    var IMAGE_SRC = {
        photography: [
            'black.JPG',
            'blue.JPG',
            'red.JPG',
            'white.JPG',
            'yellow.JPG',
            'orange.JPG',
            'green.JPG',
            'pink.JPG',
            'purple.JPG',
            'rainbow.JPG',
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

    function convertExifToDate(exifString){
        if (!exifString){return}
        var [datePart, timePart] = exifString.split(' ');
        var formattedDate = datePart.replace(/:/g, '-');
        var isoString = `${formattedDate}T${timePart}`;
        return new Date(isoString);
    }

    var XHR = new XMLHttpRequest(); // starts a XML request
    XHR.open('GET', src_link, true); // XML setup
    XHR.responseType = 'blob';
    XHR.onload = function(){
        if (XHR.readyState === 4 && XHR.status === 200){ // If the image is loaded & data is ready to be collected
            const reader = new FileReader();

            reader.onload = function(e) {
                const arrayBuffer = e.target.result;
                const exifData = EXIF.readFromBinaryFile(arrayBuffer);
                var originalTimestamp = convertExifToDate(exifData.DateTimeOriginal);

                // Update image data
                if (originalTimestamp){
                    var getHours = originalTimestamp.getHours();
                    getHours = getHours % 12;
                    getHours = getHours === 0 ? 12 : getHours;

                    listData[i].dayModified = DaysOfWeek[originalTimestamp.getDay()];
                    listData[i].timeModified = (getHours) + ':' + (originalTimestamp.getMinutes().toString().padStart(2, '0')) + ' ' + (originalTimestamp.getHours() < 12 ? 'AM' : 'PM');
                }
            }
            
            reader.readAsArrayBuffer(XHR.response);
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
    var dataIndex = listData[index];
    (dataIndex.dayModified === '...') ? $("#date").hide() : $("#date").text(dataIndex.dayModified).show();
    (dataIndex.timeModified === '...') ? $("#time").hide() : $("#time").text(dataIndex.timeModified).show();

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


$("#top-bar").addClass('hide');
$("#actions").addClass('hide');

setTimeout(() => {
    indexImage(1, true) // Start with current index
    $("#top-bar").removeClass('hide');
    $("#actions").removeClass('hide');
}, 200);

// Scroll Events
var lastScrollTop = 0 // collects last pos

function scrollIndex(increment){
    if ((CURRENT_INDEX + increment) > 0 && (CURRENT_INDEX + increment) < listData.length){
        indexImage(CURRENT_INDEX + increment)
    }
}

$(window).on('scroll', function(){
    let currentScrollTop = $(this).scrollTop();
    console.log(currentScrollTop)

    if (currentScrollTop > lastScrollTop){
        // Scrolled down
        scrollIndex(-1)
    } else {
        // Scrolled up
        scrollIndex(1)
    }

    lastScrollTop = currentScrollTop;
})
