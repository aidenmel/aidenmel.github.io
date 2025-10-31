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
var Bubbles = {};
var typingEffects = {};
var animationEffects = {};

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

// FUNCTIONS
function addEffect($object, effect, data){
    if (effect === 'color-shift'){ // When in frame, shift the site's color pallete completely
        addColorShift($object, data)
    } else if (effect === 'typing'){
        addTypingEffect($object);
    } else if (effect === 'animate'){
        animationEffects[$object.parent().offset().top] = {
            $obj: $object,
        }
        
        $object.css({
            'animation': '1000.1s linear infinite ' + ($object.attr('id')) + '-animation' ,
            '-webkit-animation-play-state': 'paused',
            'animation-play-state': 'paused',
            'animation-delay': '-0s',
        })
    }
}

// HELPER FUNCTIONS
function addColorShift($object, data){
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

function addTypingEffect($object){
    typingEffects[$object.offset().top] = {
        $obj: $object,
        string: $object.first().text(),
    }

    $object.children().first().text('')
}

function randomPosition(){
    return Math.random() * ($(document).width() - $object.width());
}


// Events
document.addEventListener('scroll', () => {
    var scrollPosition = window.scrollY;

    // Typing Effects
    for (let typingPosition in typingEffects){
        if ((scrollPosition - ($(window).height()/2)) >= (typingPosition - ($(window).height()/2))){
            var typingData = typingEffects[typingPosition]
            var distanceCompleted = (scrollPosition - typingPosition)/(typingData.$obj.parent().height())
            distanceCompleted > .9 ? distanceCompleted = 1 : distanceCompleted;
            distanceCompleted < .07 ? distanceCompleted = 0 : distanceCompleted;

            var stringLength = typingData.string.length;
            var splitString = typingData.string.split("");
            var stringToPresent = "";

            for (let x = 0; x <= (Math.ceil(distanceCompleted * stringLength)) - 1; x++) {
                stringToPresent += splitString[x];
            }

            typingData.$obj.children().first().text(stringToPresent);

            if (typingData.$obj.children().first().text() === typingData.string){
                typingData.$obj.parent().addClass('typing-complete');
            } else {
                typingData.$obj.parent().removeClass('typing-complete');
            }

        }
    }

    // Animation Effects
    for (let animationPosition in animationEffects){
        $animateObj = animationEffects[animationPosition].$obj;

        if (scrollPosition >= (animationPosition - ($animateObj.height()/2))){
            let buffer = ($animateObj.height()/2) - 48; // -48 = .is-sticky top value

            var distanceCompleted = ($animateObj.offset().top - 48 - scrollPosition)/buffer;
            distanceCompleted > .95 ? distanceCompleted = .99 : distanceCompleted;
            distanceCompleted < .05 ? distanceCompleted = .0 : distanceCompleted;

            $animateObj.css('animation-delay', (-1000 + (distanceCompleted * 1000)) + 's');
        } else {
            $animateObj.css('animation-delay', '0s');
        }
    }

    // Scroll Effects
    var setScrollPos;

    for (let position in scrollPalletes){
        if (scrollPosition >= position){
            setScrollPos = position;
        }
    }

    if (setScrollPos !== currentPallete){ // Makes sure that the root is not set already
        $(":root").css({
        '--primary': scrollPalletes[setScrollPos]['--primary'],
        '--secondary': scrollPalletes[setScrollPos]['--secondary'],
        '--black': scrollPalletes[setScrollPos]['--black'],
        '--transparency-primary': scrollPalletes[setScrollPos]['--transparency-primary'],
        '--transparency-secondary': scrollPalletes[setScrollPos]['--transparency-secondary'],
        })
    }

    currentPallete = setScrollPos;
})

// Top of Page
$(document).ready(function(){
    $(".top-of-page").on('click', function(){
        $("html, body").animate({
            scrollTop: 0,
        }, 1200)
    })
})