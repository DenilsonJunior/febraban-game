// | gameWord
// | shuffleArray | removeDiacritics -> game2.js

$(document).ready(function () {
  var shuffledWord = shuffleArray(gameWord);
  var selectWord = shuffledWord[0].word;
  var shuffledTips = shuffleArray(shuffledWord[0].tips);
  var wordArr = selectWord.split("");

  var gameCurrent = 2;
  var tipMax = 3;
  var tipCurrent = 0;
  var wordCalc = 0;
  var keyAll = 0;
  var pointMulti = 10;
  var timePosTip = 15;

  $(".info .value").text(`00:${timePosTip}:00`);
  function activeTime() {
    window.countdownTimer(timePosTip, () => {
      completeWord();
    });
  }

  function countWord(keys) {
    keyAll += keys;
  }

  function completeWord() {
    setTimeout(function () {
      console.log(gameCurrent, keyAll * pointMulti);
      $("body").trigger("game", [gameCurrent, keyAll * pointMulti]);
      // navigate.goto(`05_ranking`);
    }, 1000 * 0.5);
  }

  function tip() {
    if (tipCurrent <= tipMax - 1) {
      $(".tip").addClass(`tip${tipCurrent + 1}`);
      $(".tip .text").text(shuffledTips[tipCurrent]);
      tipCurrent += 1;

      $(".tip").css("opacity", "0");
      // $(".tip").css("margin-left", "8em");
      $(".tip").animate({ opacity: 1, "margin-left": "0" }, 1000 * 0.4);

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

    $(this).addClass("used");

    if ($(`[keycard=${key}]`).length >= 1) {
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
