$(document).ready(function () {
  setTimeout(() => {
    bridge.listRankingDB((results) => {
      console.log(results);
      controlRanking(results);
      $(".preloader").addClass("hide");
    });
  }, 1000 * 3);

  function inserirNome() {
    const $spanText = $(".textDig");
    const text = $(".textDig").text();

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
        $spanText.text(displayedText + "|");
      } else {
        $spanText.text(displayedText + " ");
      }
      blink = !blink;
    }

    // Inicia o intervalo para animar a inserção das letras
    intervaloRef.current = setInterval(function () {
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
  // Obtém o email do usuário a partir do localStorage
  const email = getObjectFromLocalStorage("user")["email"];
  if (!email) {
    console.error("Email não encontrado no localStorage.");
    return;
  }

  // Encontra o usuário atual nos resultados com base no email
  const currentUser = results.find((it) => it.id === email);
  if (!currentUser) {
    console.error("Usuário atual não encontrado nos resultados.");
    return;
  }

  // Obtém a maior pontuação do usuário atual
  const currentPointMax = currentUser.data.maior;
  const jsonString = localStorage.getItem("user");
  const user = JSON.parse(jsonString).current;

  const gameName = {
    game1: "Cursos ao Vivo",
    game2: "Cerficação",
    game3: "Cursos Online (EAD)",
  };

  // Atualiza o texto da pontuação atual no elemento com a classe 'currentScore'
  $(".currentScore").text(user.point);
  $(".currentGame").text(gameName["game" + user.game]);

  // Aplica a função ellipsis nos elementos com a classe 'nome'
  $(".nome").ellipsis({ lines: 1 });

  // Filtra os resultados para excluir os desativados e adiciona os botões de ranking
  results
    .filter((it) => !it.data.desativo)
    .forEach((item, indice) => {
      // Cria o HTML do botão de ranking
      const buttonHTML = `
        <button class="rankingScore" data-index="${indice}" data-nome="${
        item.data.nome || item.data.name
      }" data-pontos="${item.data.maior}" data-game1="${
        item.data.game1 || "-"
      }" data-game2="${item.data.game2 || "-"}" data-game3="${
        item.data.game3 || "-"
      }">
          <div class="datBase">
            <p class="number">${indice + 1 < 10 ? "0" : ""}${indice + 1}</p>
            <p class="nome">${item.data.nome || item.data.name}</p>
            <p class="point">${item.data.maior} ${
        item.data.maior == 1 ? "ponto" : "pontos"
      }</p>
          </div>
          <div class="ico"></div>
        </button>`;

      // Adiciona o botão de ranking ao DOM
      $(".ranking .boxRanking").append(buttonHTML);
    });

  // Adiciona um evento de clique a cada botão de ranking
  $(".rankingScore").on("click", function () {
    // Obtém os dados do item clicado a partir dos atributos data do botão
    const nome = $(this).data("nome");
    const pontos = $(this).data("pontos");
    const game1 = $(this).data("game1");
    const game2 = $(this).data("game2");
    const game3 = $(this).data("game3");

    // Exibe o modal e atualiza as informações do jogador no modal
    $("#pop1").css("display", "flex");
    $("#pop1 .nome").text(nome);
    $("#pop1 .game1").text(game1);
    $("#pop1 .game2").text(game2);
    $("#pop1 .game3").text(game3);
  });
};
