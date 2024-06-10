$(document).ready(function() {
    $('.init').on('click', function() {
        bridge.fullScreen();
        navigate.next();
    });

    inserirNome();

    function inserirNome() {
        const $spanText = $('.text');
        const text = $('.text').text();

        const textAnima = text; // Defina a variável textAnima com o nome desejado
        let index = 0;
        const intervaloRef = { current: null };
        
        $spanText.text(""); // Limpa o conteúdo existente
    
        intervaloRef.current = setInterval(function() {
            // Inserir uma letra do nome a cada 300 milissegundos
            $spanText.text($spanText.text() + textAnima[index]);
            index++;
            // Se todas as letras foram inseridas, parar o intervalo
            if (index === textAnima.length) {
                clearInterval(intervaloRef.current);
            }
        }, 50);
    }
});
