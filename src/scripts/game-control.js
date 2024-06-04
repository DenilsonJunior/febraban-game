events.on('ready', function() {
    controleAvatar();
    controlHeader();
    controlMenuScreen();
    controlEquipamento();
    controlConquista();
    controlSemente();
    controlCarregamento();
});


function controleAvatar(){
    $('header .avatar').on('click', function() {
        scorm.saveObject( 'avatarReturn', navigate.currentScreenUid );
        navigate.goto('05_tela');
    });

    resetAvatar();
    function resetAvatar(){
        $('.avatarContainer .cabelo').addClass('hide');
        $('.avatarContainer .bengala').addClass('hide');
        $('.avatarContainer .fone').addClass('hide');
        $('.avatarContainer .relogio').addClass('hide');
        $('.avatarContainer .chapeu').addClass('hide');
        $('.avatarContainer .oculos').addClass('hide');
        $('.avatarContainer .sapato').addClass('hide');
        $('.avatarContainer .roupa').addClass('hide');
        $('.avatarContainer .cabelo').addClass('hide');
        $('.avatarContainer .rosto').addClass('hide');
        
        if( scorm.loadObject( 'avatar') ){
            const { bengala, fone, relogio, sapatoModel, corPele, corCabelo,
                    cabeloModel, chapeuModel, oculosModel,
                    roupaModel } =  scorm.loadObject( 'avatar');

            $('.avatarContainer .bengala').removeClass( bengala ? 'hide' : '' );
            $('.avatarContainer .fone').removeClass( fone ? 'hide' : '' );
            $('.avatarContainer .relogio').removeClass( relogio ? 'hide' : '' );

            $(`.avatarContainer .cabelo${cabeloModel}`).removeClass('hide');
            $(`.avatarContainer .chapeu${chapeuModel}`).removeClass('hide');
            $(`.avatarContainer .oculos${oculosModel}`).removeClass('hide');
            $(`.avatarContainer .roupa${roupaModel}`).removeClass('hide');
            $(`.avatarContainer .sapato${roupaModel}`).removeClass('hide');

            $('.avatarContainer .pele').css('fill', corPele );
            $('.avatarContainer .cabelo .fundo path').css('fill', corCabelo );

            if(cabeloModel <= 4 ){
                $('.avatarContainer .rosto1').removeClass('hide');
            }else{
                $('.avatarContainer .rosto2').removeClass('hide');
            }
        }
    }
}

function controlHeader() {

    // $('.btnHelp').on('click', function() {
    //     $('.header').addClass('headerActive');
    //     setTimeout(function(){
    //         $('body').trigger('show-header');
    //     }, 1000 * 0.2);
    // })

    // $('#help .modal-close').focusin(function () {
    //     $('.header').removeClass('headerActive');
    // });

    $('.header .btnEquipamento').on('click', function() {
        $('body').trigger('modal-open', [$("#equipamentos")]);
      
        controlEquipamento();
        controlConquista();
    })

    $('.header .btnConquista').on('click', function() {
        $('body').trigger('modal-open', [$("#conquistas")]);

        controlEquipamento();
        controlConquista();
    })

    $('.modal-close').focusin(function () {
        $('body').trigger('modal-close');
    });

    $('.modal-close').on("click", function () {
        $('body').trigger('modal-close');
    });
}

function controlMenuScreen(){

    if( scorm.loadObject( 'check1') ){
        $('.ilha .btn2 .check').css('display', 'block');
    }
    if( scorm.loadObject( 'check2') ){
        $('.ilha .btn3 .check').css('display', 'block');
    }
    if( scorm.loadObject( 'check3') ){
        $('.ilha .btn4 .check').css('display', 'block');
    }
    if( scorm.loadObject( 'check4') ){
        $('.ilha .btn4 .check').css('display', 'block');
    }
}


function controlEquipamento(){
    $('#schoolbag .equip').addClass('equipeInativo');
    $('#schoolbag .equip').attr('')
    var all = 5;
    for( var i = 1; i <= all; i++ ){
        if( scorm.loadObject( 'equipamento'+i ) ){
            $('#equipamentos .equip'+i).removeClass('equipeInativo');
            $('.btnEquipamento').attr('data-libras', "00_equipamentos_0"+i);/// controle de libras
        }
    }
    
}

function controlConquista(){

    createConquista();
    $('body').on('pontuacao_modulo', function( _this, _modulo, _exerc ){

        var _conquista = true;
        
        for( var i=0; i<= _exerc.length; i++ ){
            if( scorm.loadObject(`${_exerc[i]}_tela-status`) == 0 ){
                _conquista = false;
            }
        }

        if(_conquista){
            scorm.saveObject( 'conquista'+_modulo , true );
            createConquista();
        }
    });
}

function createConquista(){
    $('#medal .card').addClass('cardInativo');

    var all = 4;
    for( var i = 1; i <= all; i++ ){
        if( scorm.loadObject( 'conquista'+i ) ){
            $('#medal .card'+i).removeClass('circleInativo');
            $('.btnConquista').attr('data-libras', "00_conquista_0"+i);
        }
    }
}

function controlSemente(){


}

function controlCarregamento(){

    var _page = 9;/// valor inicial // remove as 9 primeiras telas 
    if( navigate.currentScreen.index >= _page ){
        var index = navigate.currentScreen.index + 1 - _page;
        var total = navigate.pagesTotal - _page;
        var porc = parseInt(( index * 100 ) / total);

        if( scorm.loadObject( 'porc' ) ){
            if( porc >= parseInt( scorm.loadObject( 'porc' ) ) ){
                scorm.saveObject( 'porc', porc );
            }
        }else{
            scorm.saveObject( 'porc', porc );
        }
        
        var carregamento = scorm.loadObject( 'porc' );
        if( carregamento == 1 ){
            carregamento = 0;
        }

        $('header .porc .porcInt').css('width', carregamento +"%");
        console.log("carregamento: "+carregamento);
    }
}