(function (window) {
    window.opspark = window.opspark || {};
    
    function sortNumbersAscending(a, b) { return a - b; }
    
    function sortNumbersDecending(a, b) { return b - a; }
    
    function randomIntBetween(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Cursor addon
    var CursorBoundry;
    var CursorBoundryWidth = 250;
    var event = event || window.event;
    var CursorPos = [0, 0];

    var edgeleft;
    var edgeright;

    var PushModeButton;
    var PushModeEnabled = false;

    document.addEventListener('mousemove', logCursorPos);
    
    function logCursorPos(e){
        CursorPos[0] = e.clientX;
        CursorPos[1] = e.clientY;      

        if (CursorBoundry) {
            CursorBoundry.style['left'] = (CursorPos[0] - (250/2)) + 'px';
            CursorBoundry.style['top'] = (CursorPos[1] - (250/2)) + 'px';
        }

        // edgeleft.style['left'] = (CursorPos[0] - 250/2) + 'px'
        // edgeleft.style['top'] = (CursorPos[1]) + 'px'

        // edgeright.style['left'] = (CursorPos[0] + 250/2) + 'px'
        // edgeright.style['top'] = (CursorPos[1]) + 'px'

    }

    function isWithinBoundry(body, width) {
        if (body.x > (CursorPos[0] - (width/2)) && body.x < (CursorPos[0] + (width/2)) && body.y > (CursorPos[1] - (width/2)) && body.y < (CursorPos[1] + (width/2))){
            return true;
        } else {
            return false;
        }  
    }

    var racket = {
        
        extras: {
            runStartUp: function() {
                CursorBoundry = document.getElementById('cursor-boundry');
                edgeleft = document.getElementById('edge-left');
                edgeright = document.getElementById('edge-right');
                PushModeButton = document.getElementById('circle-mode');


                PushModeButton.addEventListener('click', () => {
                    if (PushModeEnabled === false){
                        CursorBoundry.classList.add('enabled');
                        PushModeButton.classList.add('enabled');
                        PushModeEnabled = true;
                    } else {
                        CursorBoundry.classList.remove('enabled');
                        PushModeButton.classList.remove('enabled');
                        PushModeEnabled = false;
                    }
                })
            }
        },

        physikz: {
            addRandomVelocity: function (body, area, multiplierX, multiplierY) {
                multiplierX = (multiplierX) ? multiplierX : .6;
                multiplierY = (multiplierY) ? multiplierY : .5;
                
                var tx = randomIntBetween(0, area.width);
                var ty = randomIntBetween(0, area.height);
                var dx = Math.abs(tx - body.x);
                var dy = Math.abs(ty - body.y);
                var angle = Math.atan2(dy, dx);
                body.rotation = angle;

                var rotationalDirection = (Math.round(Math.random()) === 1) ? 1 : -1;
                body.rotationalVelocity = randomIntBetween(1, 3) * rotationalDirection;
                var forceX = Math.cos(angle) * (Math.random() * multiplierX);
                var forceY = Math.sin(angle) * (Math.random() * multiplierY);


                body.velocityX = (tx > body.x) ? forceX : -forceX;
                body.velocityY = (ty > body.y) ? forceY : -forceY;
            },
            
            updatePosition: function (body) {
                // console.log(CursorBoundry.x - (CursorBoundry.width/2))

                if (isWithinBoundry(body, 250) === true && PushModeEnabled === true){

                    if (isWithinBoundry(body, 240) === true){
                        
                        // Returns the percentages of how deep the ball has traveled
                        var percentX = (body.x -(CursorPos[0] - (CursorBoundryWidth/2)))/(CursorPos[0]);
                        var percentY = (body.y - (CursorPos[1] - CursorBoundryWidth/2))/(CursorPos[1]);

                        if (percentX <= .25 && percentX > 0){
                            body.x = (CursorPos[0] - CursorBoundryWidth/2);
                        } else {
                            body.x = (CursorPos[0] + CursorBoundryWidth/2);
                        }

                        if (body.changingDirection === false){
                            body.velocityX *= -5;
                            body.velocityY *= -5;
                        }

                        
                        body.changingDirection = true;

                    }

                    if (body.changingDirection === false){ 
                        body.velocityX *= -3;
                        body.velocityY *= -3;
                        console.log('changing')
                        body.changingDirection = true;
                    }
                } else {
                    if (body.changingDirection === true){
                        body.velocityX /= 5;
                        body.velocityY /= 5;
                    }
                    body.changingDirection = false;
                }

                body.x += body.velocityX;
                body.y += body.velocityY;
                body.rotation += body.rotationalVelocity;
            },
            
            updateRadialPositionInArea: function (body, area) {
                var radius = body.radius;
                var w  = area.width + radius * 2;
                var h = area.height + radius * 2;
                
                body.x = (body.x + radius + body.velocityX + w) % w - radius;
                body.y = (body.y + radius + body.velocityY + h) % h - radius;
                body.rotation += body.rotationalVelocity;
            }
        },
        
        num: {
            randomIntBetween: randomIntBetween,
            sortNumbersAscending: sortNumbersAscending,
            sortNumbersDecending: sortNumbersDecending
        }
    };
    window.opspark.racket = racket;
}(window));