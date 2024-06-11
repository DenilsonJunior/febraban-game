$(document).ready(function () {
  setTimeout(() => {
    bridge.listRankingDB((results) => {
      console.log(results);
      controlRanking(results);
      $(".preloader").addClass("hide");
    });
  }, 1000 * 3);

  function inserirNome() {
    const $spanText = $('.textDig');
    const text = $('.textDig').text();
    
    const textAnima = text; // Defina a variável textAnima com o nome desejado
    let index = 0;
    let blink = true;
    const intervaloRef = { current: null };
    const blinkIntervalRef = { current: null };

    // Limpa o conteúdo existente e prepara a animação
    $spanText.text("");

    // Função para atualizar o texto com o efeito de cursor piscando
    function updateTextWithCursor() {
        let displayedText = textAnima.slice(0, index);
        if (blink) {
            $spanText.text(displayedText + '|');
        } else {
            $spanText.text(displayedText + ' ');
        }
        blink = !blink;
    }

    // Inicia o intervalo para animar a inserção das letras
    intervaloRef.current = setInterval(function() {
        index++;
        if (index > textAnima.length) {
            clearInterval(intervaloRef.current);
            clearInterval(blinkIntervalRef.current);
            $spanText.text(textAnima); // Remove o cursor final
        }
    }, 180); // Ajuste o tempo para digitação

    // Inicia o intervalo para o cursor piscando
    blinkIntervalRef.current = setInterval(updateTextWithCursor, 150); // Ajuste o tempo para piscar
  }

  // Chama a função para inserir o nome com a animação
  inserirNome();
});

const controlRanking = (results) => {
  const email = getObjectFromLocalStorage("user")["email"]; ///controlgame
  const currentUser = results.filter((it) => it.id === email)[0];
  const currentPointMax = currentUser.data.maior;

  $(".currentScore").text(currentPointMax);
  $(".nome").ellipsis({ lines: 1 });

  results
    .filter((it) => !it.data.desativo)
    .map((item, indice) => {
      $(".ranking .boxRanking")
        .append(`<button class="rankingScore" item="${indice}" data-modal="#pop1">
        
        <div class="datBase">
            <p class="number">${indice + 1 < 10 ? "0" : ""}${indice + 1}</p>
            <p class="nome" >${item.data.nome || item.data.name}</p>
            <p class="point" >${item.data.maior} ${
        item.data.maior == 1 ? "ponto" : "pontos"
      }</p>
        </div>
        <div class="ico"></div>
        </button>`);

      return item;
    });

  $(".rankingScore").on("click", function () {
    var indice = $(this).attr("item");
    console.log(results[indice]);

    $("#pop1").css("display", "flex");
    $("#pop1 .nome").text(
      results[indice].data.nome || results[indice].data.name
    );
    $("#pop1 .game1").text(results[indice].data.game1 || "-");
    $("#pop1 .game2").text(results[indice].data.game2 || "-");
    $("#pop1 .game3").text(results[indice].data.game3 || "-");
  });
};
