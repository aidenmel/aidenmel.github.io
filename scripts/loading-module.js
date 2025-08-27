// Loading Screen
// Covers the screen with a container until the site has loaded completely.

// Variables
var loadingScreen = document.getElementById('LoadingScreen');
var navBar = document.getElementById('top-nav');

// Events
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        setTimeout(() => {
            // Fade & complete
            loadingScreen.classList.add('complete');
            
            // Set display to none
            setTimeout(() => {
                loadingScreen.style = "display: none !important;";
                navBar.classList.remove('hide')
            }, 400)    
        }, 200);
    }
}