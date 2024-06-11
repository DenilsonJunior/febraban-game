$(document).ready(function () {
  var game = localStorage.getItem("game");

  function getRandomNumber() {
    return Math.floor(Math.random() * (99 - 10 + 1)) + 10;
  }

  $(".cadastro").on("click", function () {
    var name = $("#name").val();
    var email = $("#email").val();
    var empresa = $("#empresa").val() || "não defina";

    $(".alertName").css("display", "none");
    $(".alertMail").css("display", "none");

    if (name.length == 0) {
      $(".alertName").css("display", "block");
      return false;
    }
    if (email.length == 0 || !validateEmail(email)) {
      $(".alertEmail").css("display", "block");
      return false;
    }

    var informativo = $("#informativo").is(":checked");

    var data = {
      name: name,
      email: email,
      empresa: empresa,
      informativo: informativo,
      uid: Date.now(),
    };

    //localstorage
    $("body").trigger("setOrUpdateObject", ["user", data]);
    //firebase
    bridge.handlerFormDB(data);

    setTimeout(() => {
      navigate.goto(`04_game${game}-intro`);
    }, 1000 * 0.12);
  });

  function validateEmail(email) {
    // Advanced regex for email validation
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  var formRandom = getRandomNumber();
  $(".codeForm").text(formRandom);

  setTimeout(() => {
    bridge.handlerSnapshotFormDB((change) => {
      console.log(change.doc.data());
      const data = change.doc.data();

      if (data.code == formRandom) {
        //localstorage
        $("body").trigger("setOrUpdateObject", ["user", data]);
        setTimeout(() => {
          navigate.goto(`04_game${game}-intro`);
        }, 1000 * 0.12);
      }
    });
  }, 1000 * 2);

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
    }, 120); // Ajuste o tempo para digitação

    // Inicia o intervalo para o cursor piscando
    blinkIntervalRef.current = setInterval(updateTextWithCursor, 150); // Ajuste o tempo para piscar
  }

  // Chama a função para inserir o nome com a animação
  inserirNome();
});
