// Effects Module by Aiden M.

// Variables
var Root = document.documentElement;
var Buffer = 16; // Adds some wiggle room

// Numbers
var currentPallete = 0;

// Tables 
var scrollPalletes = {
    0: {
        '--primary': '#f8f8f8',
        '--secondary': '#ffffff',
        '--black': '#252525',
        '--transparency-primary': '#25252550',
        '--transparency-secondary': '#ffffff50',
    },
};

// Presets
var presetLibrary = {
    'revert': {
        '--primary': '#f8f8f8',
        '--secondary': '#ffffff',
        '--black': '#252525',
        '--transparency-primary': '#25252550',
        '--transparency-secondary': '##ffffff50',
    },
    'invert': {
        '--primary': '#000000',
        '--secondary': '#252525',
        '--black': '#ffffff',
        '--transparency-primary': '#ffffff80',
        '--transparency-secondary': '#ffffff50'
    },
}

// Functions
function addEffect($object, effect, data){
    
    
    if (effect === 'color-shift'){ // When in frame, shift the site's color pallete completely
        var objectStart = $object.offset().top;
        
        if (typeof data === 'string'){
            scrollPalletes[objectStart] = presetLibrary[data]; 
        } else {
            scrollPalletes[objectStart] = {
                '--primary': data['primary'],
                '--secondary': data['secondary'],
                '--black': data['black'],
                '--transparency-primary': data['transparency-primary'],
                '--transparency-secondary': data['transparency-secondary'],
            }   
        }
    }
}

// Events
document.addEventListener('scroll', () => {
    var setPosition;

    for (let position in scrollPalletes){
        if (window.scrollY >= position){
            setPosition = position;
        }
    }

    if (setPosition !== currentPallete){ // Makes sure that the root is not set already
        $(":root").css({
        '--primary': scrollPalletes[setPosition]['--primary'],
        '--secondary': scrollPalletes[setPosition]['--secondary'],
        '--black': scrollPalletes[setPosition]['--black'],
        '--transparency-primary': scrollPalletes[setPosition]['--transparency-primary'],
        '--transparency-secondary': scrollPalletes[setPosition]['--transparency-secondary'],
        })
    }

    currentPallete = setPosition;
    console.log(setPosition, currentPallete, scrollPalletes)
})