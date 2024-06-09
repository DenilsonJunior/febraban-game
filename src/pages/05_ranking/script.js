$(document).ready(function () {
  setTimeout(() => {
    bridge.listRankingDB((results) => {
      console.log(results);
      controlRanking(results);
      $(".preloader").addClass("hide");
    });
  }, 1000 * 3);
});

const controlRanking = (results) => {
  const email = getObjectFromLocalStorage("user")["email"]; ///controlgame
  const currentUser = results.filter((it) => it.id === email)[0];
  const currentPointMax = currentUser.data.maior;

  $(".currentScore").text(currentPointMax);
  $(".nome").ellipsis({ lines: 1 });

  results.map((item, indice) => {
    $(".ranking .boxRanking")
      .append(`<button class="rankingScore" item="${indice}" data-modal="#pop1">
        
        <div class="datBase">
            <p class="number">${indice + 1}<p>
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
