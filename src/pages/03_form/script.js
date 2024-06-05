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
        if ( email.length == 0 || !validateEmail(email) ) {
            $('.alertEmail').css('display', 'block');
            return false
        }

        const dados = {
                "name":name,
                "emal":email,
                "empresa":empresa
        }
        
        $('body').trigger('cadastro', [ dados ] );
        setTimeout(()=>{
            navigate.goto(`04_game${game}-intro`);
        }, 1000 * 0.12 )
        
    });

    function validateEmail(email) {
        // Advanced regex for email validation
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    

});
