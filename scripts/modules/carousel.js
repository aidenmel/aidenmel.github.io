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
                $("<h2>").text(itemData.title).appendTo($details);
            }

            // Adds a description
            if (itemData.desc){
                $("<p>").text(itemData.desc).appendTo($details);
            }

            // Set a image (if able)
            if (itemData.images){
                $("<img>").attr('src', itemData.images[0]).appendTo($item);
            }
    }  

    // Creates a set of controls
    var $controls = $("<div>").addClass("controls").appendTo($list);

    // Create a dot per item in list   
    for (var i = 0; i < carouselData.length; i++){
        $("<div>").addClass("dot").appendTo($controls)
    }
}