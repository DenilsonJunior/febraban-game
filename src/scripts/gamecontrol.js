$(document).ready(function() {
    fullscreen();
    
    function fullscreen() {
        $('.fullscreen').on('click', function() {
            bridge.fullScreen();
        });
    }
});

