// 
//  theme-changer.js
//  by Aiden Melton
//
//  Enables functionality for the CSS switch.
//

function changeTheme(boolean) {
    var ThemeLink = document.getElementsByTagName('link')[0];
    if (boolean === true) {
        ThemeLink.setAttribute('href', "/styles/org-style.css")

        $(".stylesheet-checkbox").each(function(){
            $(this).prop('checked', true); 
        })
    } else {
        ThemeLink.setAttribute('href', "/styles/style.css")

        $(".stylesheet-checkbox").each(function(){
            $(this).prop('checked', false); 
        })
    }
}

$(".stylesheet-checkbox").each(function() {
    $(this).click(function(){
        changeTheme($(this).is(":checked"));
    })
});