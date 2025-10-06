//
//  nav.js 
//  Aiden Melton
//
//  Creates a more dynamic navigation bar that 
//  will be displayed on nearly every page.
//

// Variables
var pages = {
    'Home': 'index.html',
    'Portfolio': 'portfolio.html',
    'Learn': 'learn.html',
}

// Functions
function insertNav($location){

    // Loop through pages
    for (let name in pages){
        var redirect = pages[name];

        // Create new list object
        var $li = $("<li>").addClass('nav-li').appendTo($location); // Creates 'li' element
        $("<a>").attr('href', redirect).text(name).appendTo($li); // Creates 'a' element
    }

}

// Loop through all ul with the '.nav-ul' class
$(document).ready(function(){
    $(".insert-nav").each(function(index, element){
        insertNav(element); 
    })
})