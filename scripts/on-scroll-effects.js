// When a content is in a specfic radius, a animation will trigger
window.addEventListener("scroll", (e) => {
    var reveals = document.querySelectorAll('.transition');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible - reveals[i].getAttribute('transition-offset')) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
});