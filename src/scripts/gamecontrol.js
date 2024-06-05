$(document).ready(function() {
    fullscreen();
    
    function fullscreen() {
        $('.fullscreen').on('click', function() {
            bridge.fullScreen();
        });
    }
    
    $('body').on('cadastro', function( e, dados ){
        console.log('cadastros ->' , dados);
    })

    $('body').on('game', function( e, game, pontos ){
        console.log(game, '<- :: ->' , pontos);
    })
});

