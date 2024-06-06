// | gameWord
// | shuffleArray | removeDiacritics -> game2.js

$(document).ready(function () {
  var shuffledWord = shuffleArray(gameWord);
  var selectWord = shuffledWord[0].word;
  var wordArr = selectWord.split("");

  var shuffledTips = shuffleArray(shuffledWord[0].tips);
  var tipCurrent = 0;
  var tipMax = 3;
  var wordCalc = 0;

  function countWord(keys) {}

  function activeTime() {}

  function completeWord() {}

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
