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


    // Functions
    var functionReveals = document.querySelectorAll('.reveal-function')

    for (var i=0; i < functionReveals.length; i++){
        var windowHeight = window.innerHeight;
        var elementTop = functionReveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible - functionReveals[i].getAttribute('transition-offset')) {
            
            window.onload = function() {
                var can = functionReveals[i].childNodes('canvas')
                var PercentCircle = functionReveals[i].getElementById('circle-variable')
                var c = can.getContext('2d')
               
                var posX = can.width / 2,
                    posY = can.height / 2,
                    fps = 1000 / 200,
                    percent = 0,
                    onePercent = 360 / 100,
                    result = onePercent * 100 * (24/36);
                c.lineCap = 'round';
                arcMove();
                
                function arcMove(){
                  var degrees = 0;
                  var acrInterval = setInterval (function() {
                    degrees += 1;
                    c.clearRect( 0, 0, can.width, can.height );
                    percent = degrees / onePercent;
              
                    PercentCircle.innerHTML = ((percent/100) * 36).toFixed();
              
                    c.beginPath();
                    c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
                    c.strokeStyle = '#25252515';
                    c.lineWidth = '16';
                    c.stroke();
              
                    c.beginPath();
                    c.strokeStyle = '#0022ff';
                    c.lineWidth = '16';
                    c.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + degrees) );
                    c.stroke();
                    if( degrees >= result ) clearInterval(acrInterval);
                  }, fps);
                  
                }
                
                
              }
        }
    }
});
