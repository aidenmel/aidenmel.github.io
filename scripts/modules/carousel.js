// Carousel Module by Aiden M.

// Variables

// Functions
function createCarousel(carouselData, $where){

    // Variables
    var $list = $("<ul>").appendTo($where);
    var $controls = $("<div>").addClass("controls").appendTo($where);
    var navDots = [];
    var lastPressed;

    // Carousel-Specific Functions
    function navigateTo(){
        var index;

        // Disable all navigation dots except the dot selected
        for (var i = 0; i < navDots.length; i++){
            if (navDots[i][0] !== $(this)[0]){
                navDots[i].removeClass('active');
            } else {
                index = i;
                navDots[i].addClass('active');
            }
        }
        
        // Move item to center
        var $itemToMove = $list.children(':eq(' + index + ')');
        var centerOfScreen = window.innerWidth / 2;
        var calculatedPos = (centerOfScreen - $itemToMove.position().left - ($itemToMove.width()/2));

        console.log(calculatedPos, ($itemToMove.position().left + ($itemToMove.width()/2)))
        if (index === 0){
            $list.css({
                'transform': 'translateX(0)',
            })
        } else {
            $list.css({
                'transform': 'translateX(' + calculatedPos + "px)",
            })
        }   

        
    }

    // Loops through carousel data and creates the carousel's children
    for (var i = 0; i < carouselData.length; i++){
        var itemData = carouselData[i];
        var $item = $('<li>').appendTo($list);

        // Creates details
        var $details = $("<div>").addClass('details').appendTo($item)
        
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
        
        // Create navigation dot
        var $navigationDot = $("<div>").addClass("dot").appendTo($controls)

        if (i === 0){
            $navigationDot.addClass('active');
            lastPressed = $navigationDot
        }
        
        $navigationDot.on('click', navigateTo) // If clicked, run navigateTo function
        navDots.push($navigationDot) // Add to array
    }  

    // If the screen size updates, fix carousel position
    // window.addEventListener('resize', navigateTo())
}