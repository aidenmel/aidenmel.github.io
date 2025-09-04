// Carousel Module by Aiden M.

// Variables

// Functions
function createCarousel(carouselData, $where){

    // Starts a new list
    var $list = $("<ul>").appendTo($where);

    // Loops through carousel data and creates the carousel's children
    for (var i = 0; i < carouselData.length; i++){
        var itemData = carouselData[i];
        var $item = $('<li>').addClass('details').appendTo($list);

        // Creates details
        var $details = $("<span>").addClass('details').appendTo($item)
        
            // Adds a title
            if (itemData.title){
                $("<h2>").text(itemData.title).appendTo($details)
            }

            // Adds a description
            if (itemData.desc){
                $("<p>").text(itemData.desc).appendTo($details)
            }
        }  

}

// Function Calls
createCarousel([
    {
        title: 'Test Title',
        desc: 'This is a temporary description that will be filled in later.',
        images: ['assets/thumbnails/white-house-thumb.jpeg'],
    }
], $('#past-work-carousel'));