$(document).ready(function() {
    setTimeout(() => {
        navigator();
        accordeon();
        pulseAdjust();
        menuCheck();
    }, 150);
    
    function navigator() {
        $('.navigator .btnNav.prev').on('click', function() {
            navigate.prev();
        });
        $('.navigator .btnNav.next').on('click', function() {
            navigate.next();
        });
    }

    function accordeon() {
        $('.interaction-accordeon').each(function(indice, item){
            var contents = $(item).find('.accordeon-texto');
            var titles = 	$(item).find('.accordeon-title');
            var nextLiberate = ($(item).attr('nextLiberate')) ? $(item).attr('nextLiberate') : false;
    
            titles.find('.seta-container').addClass('animated infinite pulse');
            titles.on('click', function() {
                    var title = $(this);
                    console.log(title)
    
                    contents.filter(':visible').slideUp(function() {
                            $(this).prev('.accordeon-title').removeClass('is-opened');
                    });
    
                    var content = title.next('.accordeon-texto');
                    if (!content.is(':visible')) {
                            content.slideDown(function() { title.addClass('is-opened') });
                    }
    
                    $(this).find('.seta-container').removeClass('animated infinite pulse');
                    $(this).addClass('open');
    
                    verifyNext();
            });
    
            function verifyNext() {
                var botoes = $(titles).toArray();
                var todosBotoesClicados = botoes.every(botao => {
                        return $(botao).hasClass('open');
                });
    
                if (todosBotoesClicados) {
                    if(nextLiberate){
                        $('body').trigger('nextLiberate');// on in itenraction-arrows.
                        $('.next').removeClass('hide');
                    }
                }

                if ($('.accordeon-title').not('.open').length === 0) {
                    $('.next').removeClass('hide');
                }
            }
    
        })
    }

    function pulseAdjust() {
        $('.modal-close').addClass('animated pulse infinite');
        $('.slider-control-next').addClass('animated pulse infinite');
    }

    function menuCheck() {
        var obj = scorm.loadObject('menu');

        // Verifica se obj não está definido ou é nulo ou uma string vazia
        if (!obj) {
            scorm.saveObject('menu', 0);
        }

        // Remove a classe 'block' de todas as classes .cap de uma vez,
        // dependendo do valor de obj
        for (var i = 1; i <= obj; i++) {
            $('.cap' + i).removeClass('block');
        }

        if( scorm.loadObject('menuOri') == 1 ) {
            $('.cap5').removeClass('block');
        }
    }

});

