$(document).ready(function () {
  $(".init").on("click", function () {
    bridge.fullScreen(true);
    navigate.next();
  });

  function inserirNome() {
    const $spanText = $(".text");
    const text = $(".text").text();

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
    }, 120); // Ajuste o tempo para digitação

    // Inicia o intervalo para o cursor piscando
    blinkIntervalRef.current = setInterval(updateTextWithCursor, 150); // Ajuste o tempo para piscar
  }

  // Chama a função para inserir o nome com a animação
  inserirNome();
});
