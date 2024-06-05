$(document).ready(function() {
    var game = scorm.loadObject('game');

    $('.cadastro').on('click', function() {
        var name = $('#name').val();
        var email = $('#email').val();
        var empresa = $('#empresa').val();

        $('.alertName').css('display', 'none');
        $('.alertMail').css('display', 'none');

        if ( name.length == 0 ) {
            $('.alertName').css('display', 'block');
            return false
        }
        if ( email.length == 0 || !IsEmail(email) ) {
            $('.alertEmail').css('display', 'block');
            return false
        }
        
        // alert('Sucesso!')
        navigate.goto(`04_game${game}-intro`);
    });

    function IsEmail(email) {
        // Expressão regular para excluir caracteres inválidos
        var exclude = /[^a-zA-Z0-9@.-]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*\1/;
        // Expressão regular para verificar a presença de um @ seguido por caracteres válidos
        var check = /@[a-zA-Z0-9-]+\./;
        // Expressão regular para verificar a terminação com domínio de 2 a 6 caracteres
        var checkend = /\.[a-zA-Z]{2,6}$/;
    
        // Verifica se o email atende todas as condições
        if (email.search(exclude) != -1 || email.search(check) == -1 || email.search(checkend) == -1) {
            return false;
        } else {
            return true;
        }
    }
    

});
