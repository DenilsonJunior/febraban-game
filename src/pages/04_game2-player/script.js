// | gameWord
// | shuffleArray | removeDiacritics -> game2.js

var countdownTimer = function (duration) {
  let timer = duration,
    minutes,
    seconds;
  const interval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $(".info .value").text(minutes + ":" + seconds);

    if (--timer < 0) {
      clearInterval(interval);
      this.time = "00:00";
      $(".info .value").text("00:00");
      // alert("Tempo esgotado!");
      navigate.goto(`05_ranking`);
    }
  }, 1000);
};

$(document).ready(function () {
  var shuffledWord = shuffleArray(gameWord);
  var selectWord = shuffledWord[0].word;
  var wordArr = selectWord.split("");

  var gameCurrent = 2;
  var timePosTip = 15;
  var shuffledTips = shuffleArray(shuffledWord[0].tips);
  var tipCurrent = 0;
  var tipMax = 3;
  var wordCalc = 0;

  $(".info .value").text("00:15");

  function countWord(keys) {
    $("body").trigger("game", [gameCurrent, keys]);
  }

  function activeTime() {
    countdownTimer(timePosTip);
  }

  function completeWord() {
    setTimeout(function () {
      navigate.goto(`05_ranking`);
    }, 1000 * 1);
  }

  function tip() {
    if (tipCurrent <= tipMax - 1) {
      $(".tip").addClass(`tip${tipCurrent + 1}`);
      $(".tip .text").text(shuffledTips[tipCurrent]);
      tipCurrent += 1;

      $(".tip").css("opacity", "0");
      $(".tip").animate({ opacity: 1 }, 1000 * 0.4);

      if (tipCurrent == tipMax) {
        activeTime();
      }
    }
  }

  tip();

  wordArr.map((item) => {
    $(".cards").append(`<div class="card" keycard="${removeDiacritics(
      item
    ).toLowerCase()}">
        <div class="front"></div>
        <div class="back">
            <span>${item}</span>
        </div>
        </div>`);

    return item;
  });

  $("[key]").on("click", function () {
    const key = String($(this).attr("key")).toLowerCase();
    $(`[keycard=${key}]`).addClass("correct");
    tip();

    if ($(`[keycard=${key}]`).length >= 1) {
      $(this).addClass("used");
      wordCalc += $(`[keycard=${key}]`).length;

      countWord($(`[keycard=${key}]`).length);

      if (wordCalc == wordArr.length) {
        completeWord();
      }
    }
  });

  console.log(selectWord);
  console.log(wordArr);
});
