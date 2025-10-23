// 
//  theme-changer.js
//  by Aiden Melton
//
//  Enables functionality for the CSS switch.
//

function changeTheme(boolean) {
    var ThemeLink = document.getElementsByTagName('link')[0];
    if (boolean === true) {
        ThemeLink.setAttribute('href', "/style.css")
    } else {
        ThemeLink.setAttribute('href', "/alternative-style.css")
    }
}