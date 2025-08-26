// Loading Screen
// Covers the screen with a container until the site has loaded completely.

// Variables
var loadingScreen = document.getElementById('LoadingScreen');
var navBar = document.getElementById('top-nav');

// Events
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        setTimeout(() => {
        loadingScreen.classList.add('complete');
        
        setTimeout(() => {
            loadingScreen.classList.add('disabled')
            
            setTimeout(() => {
                navBar.classList.remove('active')
            }, 400);
        }, 400)    

        }, 200);
    }
}