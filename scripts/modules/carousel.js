// Carousel Module by Aiden M.

// Variables

// Functions
function createCarousel(carouselData, $where, properties){

    // Variables
    var $list = $("<ul>").appendTo($where);
    var $controls = $("<div>").addClass("controls").appendTo($where);
    
    var items = [];
    var navDots = [];
    var currentIndex = 0;

    // Carousel-Specific Functions
    function navigateTo(redirect){

        if (redirect === 0){redirect = 0}
        else if (!redirect) { redirect = currentIndex; } // If redirect is undefined, set it to current index
        else if (redirect instanceof jQuery.Event) { redirect = redirect.data.itemIndex }

        // Disable all navigation dots except the dot selected
        for (var i = 0; i < navDots.length; i++){
            if (i !== redirect){
                navDots[i].removeClass('active');
            } else {
                navDots[i].addClass('active');
            }
        }
        
        // Move item to center
        var $itemToMove = items[redirect];
        var centerOfScreen = window.innerWidth / 2;
        var calculatedPos = (centerOfScreen - $itemToMove.position().left - ($itemToMove.width()/2));

        if (redirect === 0){
            $list.css({
                'transform': 'translateX(0)',
            })
        } else {
            $list.css({
                'transform': 'translateX(' + calculatedPos + "px)",
            })
        }   

        currentIndex = redirect;
        
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
            
            // Adds item to carousel array
            items.push($item)

            // If item pressed, navigate to it (if not already)
            $item.on('click', {itemIndex: i}, navigateTo)

        // Create navigation dot
        var $navigationDot = $("<div>").addClass("dot").appendTo($controls)

            if (i === 0){
                $navigationDot.addClass('active');
            }
        
            // Click event
            $navigationDot.on('click', {itemIndex: i}, navigateTo) // If clicked, run navigateTo function
            
            // Push to end of array
            navDots.push($navigationDot) // Add to array
    }  

    // If the screen size updates, fix carousel position
    window.addEventListener('resize', navigateTo(currentIndex))

    // Adding Unique Effects & Properties
    if (properties.cycleOnScroll === true){ // Cycles through all available items as the user scrolls pass
        var topOfParent = $where.parent().offset().top; // Gets top of the sticky section
        var parentHeight = $where.parent().height(); // Gets the total height of available scrolling

        $(window).scroll(function() {
            
            // Calculate percent & determine object to index
            var scrollPercent = (window.scrollY - topOfParent)/(parentHeight - $where.height());
            var toIndex = Math.floor(scrollPercent * items.length);
            
            // Only update if 
            if (currentIndex !== toIndex && scrollPercent < 1 && scrollPercent > 0){
                navigateTo(toIndex)
            }
        })
    }

    if (properties.sectionTitle){
        
        $(window).scroll(function() {
            var scrollPercent = (window.scrollY - topOfParent)/(parentHeight - $where.height());
            if (scrollPercent > 0 && scrollPercent < 1){
                $("nav").addClass('aside');
                $("#nav-title").text(properties.sectionTitle).addClass('active');
            } else {
                $("#nav-title").removeClass('active');
                $("nav").removeClass('aside');
            }
        })
    }
}