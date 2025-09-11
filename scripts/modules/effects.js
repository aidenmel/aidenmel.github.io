// Effects Module by Aiden M.

// Variables
var Root = document.documentElement;
var Buffer = 16; // Adds some wiggle room

// Functions
function addEffect($object, effect, data){


    if (effect === 'color-shift'){ // When in frame, shift the site's color pallete completely
        var objectStart = $object.offset().top;
        
        document.addEventListener('scroll', (e) => {
            if (window.scrollY >= (objectStart - Buffer)){
                $(":root").css({
                    '--primary': data['primary'],
                    '--secondary': data['secondary'],
                    '--black': data['black'],
                })
            } else {
                $(":root").css({
                    '--primary': '#f8f8f8',
                    '--secondary': '#ffffff',
                    '--black': '#252525',
                })
            }
        })
    }

}