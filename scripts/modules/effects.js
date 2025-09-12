// Effects Module by Aiden M.

// Variables
var Root = document.documentElement;
    var PreviousPallete = {
        '--primary': '#f8f8f8',
        '--secondary': '#ffffff',
        '--black': '#252525',
    }
var Buffer = 16; // Adds some wiggle room

// Functions
function addEffect($object, effect, data){


    if (effect === 'color-shift'){ // When in frame, shift the site's color pallete completely
        var objectStart = $object.offset().top;
        
        document.addEventListener('scroll', (e) => {
            if (window.scrollY >= (objectStart - (window.innerHeight / 3) - Buffer) && window.scrollY < $object.height() - Buffer - (window.innerHeight / 3)){
                console.log($object)
                $(":root").css({
                    '--primary': data['primary'],
                    '--secondary': data['secondary'],
                    '--black': data['black'],
                })
            } else {
                $(":root").css({
                    '--primary': PreviousPallete['--primary'],
                    '--secondary': PreviousPallete['--secondary'],
                    '--black': PreviousPallete['--black'],
                })
            }
        })
    }

}