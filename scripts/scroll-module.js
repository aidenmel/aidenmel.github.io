// Scroll Module - 2024
//  Made by Aiden Melton

// Made in the 'Airpods Project' and later reworked for all pages. Incorporates CSS animations with scrolling events.

// Variables
var Offset = 150; // The offset before an animation starts in pixels
var ScrollResponsiveObjects = document.getElementsByClassName('scroll-responsive');
// console.log(ScrollResponsiveObjects.length, ScrollResponsiveObjects[0])

// Collect Positions
var StoredPositions = [];

for (let i = 0; i < ScrollResponsiveObjects.length; i++){
    StoredPositions[i] = ScrollResponsiveObjects[i].getBoundingClientRect().top + window.scrollY;
}

// Events
window.addEventListener('scroll', (e) => {
            
          // Get scroll position
          var ScrollPos = window.scrollY;

          // Loop through scroll-responsive objects
        for (let i = 0; i < ScrollResponsiveObjects.length; i++) {

            var Object = ScrollResponsiveObjects[i];
            var DataObject = Object; // Object used to collect data from

            // console.log(Number(Object.getAttribute('UseParentData')))

            if (Object.getAttribute('UseParentData')){
                
                if (Object.getAttribute('UseParentData') === true){
                    DataObject = Object.parentNode;
                } else {
                    for (let i = 1; i < Number(Object.getAttribute('UseParentData')); i++){
                        DataObject.parentNode;
                    }
                }
            }

            var ObjectStart = DataObject.getBoundingClientRect().top + window.scrollY - (DataObject.getBoundingClientRect().height) + Offset;
            var ObjectEnd = DataObject.getBoundingClientRect().top + window.scrollY + Offset;

            // Additional offset
            if (Object.getAttribute('scroll-offset')){
                ObjectStart += Number(Object.getAttribute('scroll-offset'));
            }

            // Debug
            // console.log(ObjectStart, ObjectEnd, scrollY)

            if (ScrollPos > ObjectStart && ScrollPos < ObjectEnd){
                
                var Percentage = (ScrollPos - ObjectStart)/(ObjectEnd - ObjectStart);

                // console.log('%' + (Percentage * 100)) // Debug

                // Set restrictions to percents
                if (Percentage <= 0.02){
                    Percentage == -0;
                } else if (Percentage >= .98){
                    Percentage == -999.99;
                }
                
                // Set effect (if it meets the criteria)
                Object.style.animationDelay = -(Percentage * 1000) + 's' ;
            }
        }
        })