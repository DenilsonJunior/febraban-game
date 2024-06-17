const measures = {
  canvasW: 920,
  canvasH: 910,
};

const allOrientations = [
  "horizontal",
  "horizontalBack",
  "vertical",
  "verticalUp",
  "diagonal",
  "diagonalUp",
  "diagonalBack",
  "diagonalUpBack",
];

const gameCurrent = 3;
const timeGame = 60 * 1; ///60
let workAll = 0;
const pointMulti = 10;
const definedWords = [
  "Compliance",
  "Crédito",
  "ESG",
  "LGPD",
  "SAC",
  "PLDFT",
  "Libras",
  "Sustentabilidade",
  "Preparatório",
  "Correspondentes",
];

$(document).ready(function () {
  gameWordSearch();
});

function countWord(word) {
  workAll += word;
}

function activeTime() {
  window.countdownTimer(timeGame, () => {
    $("body").trigger("game", [gameCurrent, workAll * pointMulti]);
  });
}

function completeWord() {
  setTimeout(function () {
    $("body").trigger("game", [gameCurrent, workAll * pointMulti]);
  }, 1000 * 1);
}

function gameWordSearch() {
  $(".info .value").text("01:00");
  var WordSearch = {};

  WordSearch.Game = function (game) {
    //  This is your word list. Add or remove any words you like in here.
    //  The words mustn't contain any spaces or numbers.

    //  The shorter the array, the larger the letter tiles will scale in-game.

    var _this = this;
    this.words = [];
    this.wordsBase = definedWords;

    //this.wordsBase = ['Colaboração', 'Proximidade'];

    $.each(this.wordsBase, function (index, value) {
      _this.words.push(_this.removerAcentos(value).toLowerCase());
    });

    this.letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "Ç",
      "Ã",
      "É",
      "Ó",
    ];

    this.puzzle = null;
    this.solution = null;

    //  The BitmapFont word list down the side
    this.wordList = {};

    //  The dimensions of the word search, in letters (not pixels)
    //  You can set a fixed size here.
    //  Or set to -1 means it'll adapt to fit the longest word in the words array.
    this.puzzleWidth = -1;
    this.puzzleHeight = -1;

    //  The size of each letter sprite sheet, in pixels
    this.tileWidth = 100;
    this.tileHeight = 100;

    //  The selection line color and thickness
    this.drawLineColor = 0x00ff00;
    this.drawLineAlpha = 0.6;
    this.drawLineThickness = 26;

    //  A tint applied to the letters when a word is found
    // this.highlightTintContainer = ["#E90F6A", "#0bb7e1", "#D9F339"];
    this.highlightTintContainer = [
      "#D9F339",
      "#D9F339",
      "#D9F339",
      "#D9F339",
      "#D9F339",
      "#D9F339",
      "#D9F339",
      "#D9F339",
      "#D9F339",
      "#D9F339",
    ];
    this.highlightTintIndice = 0;
    this.highlightTint = 0xffff00;

    //  Booleans to control the game during play
    this.drawLine = null;

    this.isSelecting = false;
    this.firstLetter = null;
    this.endLetter = null;
    this.foundWords = [];
  };

  WordSearch.Game.prototype = {
    preload: function () {
      //this.load.script('wordfind', 'libs/wordfind.js');

      this.load.path = "../../assets/img/game3/";

      this.load.bitmapFont("azo");

      var _this = this;

      this.letters.forEach(function (letter) {
        var nameIMG = letter;

        if (letter == "Ã") nameIMG = "A1";
        else if (letter == "Ç") nameIMG = "C1";
        else if (letter == "É") nameIMG = "E1";
        else if (letter == "Ó") nameIMG = "O1";

        _this.load.spritesheet(
          letter.toLowerCase(),
          nameIMG + ".png",
          _this.tileWidth,
          _this.tileHeight
        );
      });

      this.scaleRatio = window.devicePixelRatio / 3;

      _this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      _this.scale.setShowAll();

      window.addEventListener("resize", function () {
        _this.scale.refresh();
      });
      _this.scale.refresh();
    },

    create: function () {
      this.stage.backgroundColor = "#ffffff";

      activeTime();

      if (this.puzzleWidth !== -1) {
        this.puzzle = wordfind.newPuzzle(this.words, {
          width: this.puzzleWidth,
          height: this.puzzleHeight,
          orientations: allOrientations,
        });
      } else {
        this.puzzle = wordfind.newPuzzle(this.words, {
          orientations: allOrientations,
        });
        this.puzzleWidth = this.puzzle[0].length;
        this.puzzleHeight = this.puzzle.length;
      }

      var solution = wordfind.solve(this.puzzle, this.words);

      this.solution = solution.found;

      //  Un-comment these to Debug the puzzle, the first outputs the puzzle to the console
      //  The second outputs the answers object

      // wordfind.print(this.puzzle);
      // console.log(this.solution);

      //  Create the letter tile grid

      var x = 0;
      var y = 0;
      var _this = this;

      this.grid = this.add.group();
      this.grid.inputEnableChildren = true;

      this.puzzle.forEach(function (row) {
        row.forEach(function (letter) {
          var tile = _this.grid.create(x, y, letter, 0);

          tile.data.row = x / _this.tileWidth;
          tile.data.column = y / _this.tileHeight;
          tile.data.words = {};
          tile.data.letter = letter;
          tile.data.startWord = false;

          tile.events.onInputDown.add(_this.startLetterSelect, _this);
          tile.events.onInputUp.add(_this.stopLetterSelect, _this);
          tile.events.onInputOver.add(_this.overLetter, _this);
          tile.events.onInputOut.add(_this.outLetter, _this);

          x += _this.tileWidth;
        });

        x = 0;
        y += _this.tileHeight;
      });

      //  Flag all of the starting letters in the grid
      this.solution.forEach(function (entry) {
        //  Based on the grid position we can get the tile index
        var index = entry.y * _this.puzzleWidth + entry.x;

        var tile = _this.grid.getChildAt(index);

        tile.data.startWord = true;
        tile.data.words[entry.word] = {
          orientation: entry.orientation,
          length: entry.word.length,
        };
      });

      //  This controls the position and scale of the word search grid
      //  Setting the width / height automatically scales the Group
      //  If you remove this, the tiles will be displayed at their full size
      //
      //  Use it to position the grid within your game, and make sure it fits
      //  no matter how many words are in it.

      this.grid.x = 45;
      this.grid.y = 45;
      this.grid.width = 827;
      this.grid.height = 816;

      //  Display the words to find down the right-hand side, and add to the wordList object

      var x_InitSolution = 40;
      var y_InitSolution = 880;

      x = x_InitSolution;
      y = y_InitSolution;

      // Palavras dicas
      // this.solution.forEach(function (entry, indice) {
      //   //  One BitmapText per word (so we can change their color when found)
      //   var style = {
      //     font: "30px Arial", ///Import: Usar sempre Arial para nao quebrar a font
      //     fill: "0x000000",
      //     align: "left",
      //   };

      //   x = indice < 5 ? x : x_SecondCol; /// Da quinta palavra já cria a segunda coluna
      //   y = indice == 5 ? y_InitSolution : y;

      //   var _palavras = _this.add.text(x, y, _this.wordsBase[indice], style);
      //   _palavras.fontWeight = "bold";

      //   _this.wordList[entry.word] = _palavras;

      //   y += 42;
      // });

      // Verifique se a lista de palavras existe no DOM
      const listContainer = document.querySelector("ul.listPalavras");

      // Se a lista de palavras existir no DOM
      if (listContainer) {
        // Iterar sobre cada entrada na solução
        this.solution.forEach((entry, indice) => {
          // Criar um elemento <li> para representar a palavra
          const li = document.createElement("li");
          li.textContent = this.wordsBase[indice];

          // Adicionar o elemento <li> à lista de palavras
          listContainer.appendChild(li);

          // Armazenar uma referência ao elemento de texto criado para a palavra correspondente
          this.wordList[entry.word] = li;

          // Adicionar uma classe CSS para estilizar a palavra
          li.classList.add("word");
        });
      } else {
        // Se a lista de palavras não existir no DOM, exibir um erro no console
        console.error(
          "A lista de palavras (ul.listPalavras) não foi encontrada no DOM."
        );
      }

      //  The Graphics object that controls the letter selection line

      this.drawLine = this.add.graphics(0, 0);

      //  This starts a callback going, that updates whenever the mouse moves,
      //  and calls updateDrawLine. All of the main game logic happens as a result
      //  of events triggered within here, and the letter tile input handlers.

      this.input.addMoveCallback(this.updateDrawLine, this);
    },

    /**
     * Draws the selection line, showing which letter tiles are being selected.
     */
    updateDrawLine: function (pointer, x, y) {
      if (!this.isSelecting) {
        return;
      }

      this.drawLine.clear();

      this.drawLine.lineStyle(
        this.drawLineThickness,
        this.drawLineColor,
        this.drawLineAlpha
      );

      var tw = (this.tileWidth * this.firstLetter.worldScale.x) / 2;
      var th = (this.tileHeight * this.firstLetter.worldScale.y) / 2;

      this.drawLine.moveTo(
        this.firstLetter.worldPosition.x + tw,
        this.firstLetter.worldPosition.y + th
      );

      this.drawLine.lineTo(x, y);
    },

    /**
     * Called when the mouse is pressed down on any of the letter tiles.
     */
    startLetterSelect: function (letter) {
      this.isSelecting = true;

      this.firstLetter = letter;
    },

    /**
     * Called when the mouse is released from any of the letter tiles.
     * This performs all of the core checks in terms of if they've selected
     * a full word, won the game, etc.
     */
    stopLetterSelect: function (letter) {
      this.isSelecting = false;

      //  Let's check to see if they selected an actual word :)
      if (
        this.firstLetter &&
        this.endLetter &&
        this.firstLetter !== this.endLetter &&
        (this.firstLetter.data.startWord || this.endLetter.data.startWord) &&
        this.checkLetterAlignment(this.endLetter)
      ) {
        var result = this.checkSelectedLetters();

        if (result) {
          this.highlightCorrectWord(result);
          this.foundWords.push(result.word);
        }

        //  Check word list, game won?
        if (this.foundWords.length === this.solution.length) {
          this.gameWon();
        }
      }

      this.grid.setAll("frame", 0);

      this.clearLine();
    },

    /**
     * Clears the selection line, and resets the first and last letters.
     */
    clearLine: function () {
      this.firstLetter = false;
      this.endLetter = null;

      this.drawLine.clear();
    },

    /**
     * Called from within stopLetterSelect and both tints the BitmapText word
     * on the right-hand side, and also tints each tile that was matched.
     *
     * If you're going to use a different kind of effect, then you probably want
     * to edit or skip most of this function.
     */
    highlightCorrectWord: function (result) {
      var _this = this;

      countWord(1);

      //  result contains the sprites of the letters, the word, etc.
      var tinta = this.highlightTintContainer[this.highlightTintIndice];
      this.wordList[result.word].fill = tinta;

      var element = this.wordList[result.word];

      // Verifica se o elemento foi encontrado
      if (element) {
        // Adiciona a classe 'visited' ao elemento
        element.classList.add("visited");
      } else {
        console.error(
          "Elemento não encontrado para a palavra-chave:",
          result.word
        );
      }

      result.letters.forEach(function (letter) {
        letter.tint = tinta.replace("#", "0x");
      });

      this.highlightTintIndice += 1;
    },

    /**
     * Called by the letter tile input handler when it is moused over.
     * In short, it checks if it should swap frame or not.
     */
    overLetter: function (letter) {
      if (this.isSelecting) {
        if (this.checkLetterAlignment(letter)) {
          this.endLetter = letter;

          //  Highlight the tiles below the line (if any)
          var selection = this.getSelectedLetters();

          if (selection && selection.letters.length > 0) {
            this.grid.setAll("frame", 0);

            selection.letters.forEach(function (sprite) {
              sprite.frame = 1;
            });
          }
        }
      } else {
        letter.frame = 1;
      }
    },

    /**
     * Swaps the letter frame back, if not in selecting mode.
     */
    outLetter: function (letter) {
      if (!this.isSelecting) {
        letter.frame = 0;
      }
    },

    /**
     * Called once all words have been found.
     */
    gameWon: function (_containerTela) {
      completeWord();
    },

    //  From this point on, all of the functions deal with checking the letters,
    //  getting selected letters, and checking for word matching. There is no
    //  display related code in any of the following, it's all game logic.

    checkLetterAlignment: function (letter) {
      var startRow = this.firstLetter.data.row;
      var startColumn = this.firstLetter.data.column;
      var endRow = letter.data.row;
      var endColumn = letter.data.column;

      return (
        startColumn === endColumn ||
        startRow === endRow ||
        Math.abs(endColumn - startColumn) === Math.abs(endRow - startRow)
      );
    },

    getLetterAt: function (row, column) {
      var index = column * this.puzzleWidth + row;

      return this.grid.getChildAt(index);
    },

    getSelectedLetters: function () {
      if (
        !this.firstLetter ||
        !this.endLetter ||
        this.endLetter === this.firstLetter
      ) {
        return false;
      }

      var first = this.firstLetter.data;
      var last = this.endLetter.data;
      var tile;
      var letters = [];
      var selectedWord = "";
      var x, y, top, bottom, left, right;

      //  Let's get all the letters between the first and end letters

      if (first.row === last.row) {
        //  Vertical grab

        top = Math.min(first.column, last.column);
        bottom = Math.max(first.column, last.column);

        for (y = top; y <= bottom; y++) {
          tile = this.getLetterAt(first.row, y);
          letters.push(tile);
          selectedWord = selectedWord.concat(tile.data.letter);
        }
      } else if (first.column === last.column) {
        //  Horizontal grab

        left = Math.min(first.row, last.row);
        right = Math.max(first.row, last.row);

        for (x = left; x <= right; x++) {
          tile = this.getLetterAt(x, first.column);
          letters.push(tile);
          selectedWord = selectedWord.concat(tile.data.letter);
        }
      } else {
        top = Math.min(first.column, last.column);
        bottom = Math.max(first.column, last.column);
        left = Math.min(first.row, last.row);
        right = Math.max(first.row, last.row);

        if (first.column > last.column && first.row < last.row) {
          //  Diagonal NE grab (up and from left to right)
          y = bottom;

          for (x = left; x <= right; x++) {
            tile = this.getLetterAt(x, y);
            letters.push(tile);
            selectedWord = selectedWord.concat(tile.data.letter);
            y--;
          }
        } else if (first.column < last.column && first.row < last.row) {
          //  Diagonal SE grab (down and from left to right)
          y = top;

          for (x = left; x <= right; x++) {
            tile = this.getLetterAt(x, y);
            letters.push(tile);
            selectedWord = selectedWord.concat(tile.data.letter);
            y++;
          }
        } else if (first.column < last.column && first.row > last.row) {
          //  Diagonal SW grab (down and from right to left)
          y = top;

          for (x = right; x >= left; x--) {
            tile = this.getLetterAt(x, y);
            letters.push(tile);
            selectedWord = selectedWord.concat(tile.data.letter);
            y++;
          }
        } else if (first.column > last.column && first.row > last.row) {
          //  Diagonal NW grab (up and from right to left)
          y = bottom;

          for (x = right; x >= left; x--) {
            tile = this.getLetterAt(x, y);
            letters.push(tile);
            selectedWord = selectedWord.concat(tile.data.letter);
            y--;
          }
        } else {
          return false;
        }
      }

      return {
        word: selectedWord,
        inverse: Phaser.Utils.reverseString(selectedWord),
        letters: letters,
      };
    },

    checkSelectedLetters: function () {
      var selection = this.getSelectedLetters();

      if (selection) {
        //  It's possible that a single letter could start multiple words in different directions:
        //
        //  cow..
        //  a....
        //  r....

        var starter = this.firstLetter.data.startWord
          ? this.firstLetter.data
          : this.endLetter.data;

        for (var word in starter.words) {
          if (word === selection.word || word === selection.inverse) {
            return {
              word: word,
              letters: selection.letters,
            };
          }
        }
      }

      return false;
    },

    removerAcentos: function (s) {
      var map = {
        â: "a",
        Â: "A",
        à: "a",
        À: "A",
        á: "a",
        Á: "A",
        /*"ã": "a",
        "Ã": "A",*/
        ê: "e",
        Ê: "E",
        è: "e",
        È: "E",
        // é: "e",
        // É: "E",
        î: "i",
        Î: "I",
        ì: "i",
        Ì: "I",
        í: "i",
        Í: "I",
        õ: "o",
        Õ: "O",
        ô: "o",
        Ô: "O",
        ò: "o",
        // Ò: "O",
        // ó: "o",
        Ó: "O",
        ü: "u",
        Ü: "U",
        û: "u",
        Û: "U",
        ú: "u",
        Ú: "U",
        ù: "u",
        Ù: "U",
        /*"ç": "c",
        "Ç": "C"*/
      };

      return s.replace(/[\W\[\] ]/g, function (a) {
        return map[a] || a;
      });
    },
  };

  //  Creates the game instance and starts it running

  var game = new Phaser.Game(
    measures.canvasW,
    measures.canvasH,
    Phaser.CANVAS,
    "game"
  );
  game.state.add("WordSearch.Game", WordSearch.Game, true);
}
