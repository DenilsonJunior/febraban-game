$(document).ready(function() {
    function calcularTotalPontos() {
        var totalPontos = 0;
        $(".pontos").each(function() {
            var pontos = parseInt($(this).text());
            totalPontos += pontos;
        });
        $(".totalPontos").text(totalPontos);
    }
    
    calcularTotalPontos();
});
