$(document).ready(function () {
  let CardTypes = [
    { name: "carta1", image: "../../assets/img/game1/carta1.svg" },
    { name: "carta2", image: "../../assets/img/game1/carta2.svg" },
    { name: "carta3", image: "../../assets/img/game1/carta3.svg" },
    { name: "carta4", image: "../../assets/img/game1/carta4.svg" },
    { name: "carta5", image: "../../assets/img/game1/carta5.svg" },
    { name: "carta6", image: "../../assets/img/game1/carta6.svg" },
    { name: "carta7", image: "../../assets/img/game1/carta7.svg" },
    { name: "carta8", image: "../../assets/img/game1/carta8.svg" },
    { name: "carta9", image: "../../assets/img/game1/carta9.svg" },
  ];

  let shuffleCards = () => {
    let cards = [].concat(_.cloneDeep(CardTypes), _.cloneDeep(CardTypes));
    return _.shuffle(cards);
  };

  new Vue({
    el: "#app",

    data: {
      showSplash: false,
      cards: [],
      started: false,
      startTime: 0,
      turns: 0,
      flipBackTimer: null,
      timer: null,
      time: "00:40:00",
      score: 0,
      game: 1,
      cardFlipTimeInit: 3, /// Tempo inicial em que os flip card ficam virados
      cardTimeComplete: 40 * 1, //60*1 /// tempo do cronometro
      pairsCorrect: 0, /// Pares corretos de cards
      pointMulti: 10, // Multiplo dos pontos finais
    },

    methods: {
      resetGame() {
        this.showSplash = false;
        let cards = shuffleCards();
        this.turns = 0;
        this.score = 0;
        this.started = false;
        this.startTime = 0;

        _.each(cards, (card) => {
          card.flipped = true;
          card.found = false;
        });

        //Nil
        const _this = this;
        setTimeout(() => {
          _.each(cards, (card) => {
            card.flipped = false;
            card.found = false;
          });

          window.countdownTimer(_this.cardTimeComplete, () => {
            _this.savePointGame();
          });
        }, 1000 * this.cardFlipTimeInit);
        //Nil

        this.cards = cards;
      },

      flippedCards() {
        return _.filter(this.cards, (card) => card.flipped);
      },

      sameFlippedCard() {
        let flippedCards = this.flippedCards();
        if (flippedCards.length == 2) {
          if (flippedCards[0].name == flippedCards[1].name) return true;
        }
      },

      savePointGame() {
        let foundCards = _.filter(this.cards, (card) => card.found);
        this.pairsCorrect = (foundCards.length / 2) * this.pointMulti;
        console.log(this.pairsCorrect);

        $("body").trigger("game", [this.game, this.pairsCorrect]);
      },

      setCardFounds() {
        _.each(this.cards, (card) => {
          if (card.flipped) {
            card.found = true;
          }
        });
      },

      checkAllFound() {
        let foundCards = _.filter(this.cards, (card) => card.found);
        if (foundCards.length == this.cards.length) return true;
      },

      // countdownTimer(duration , call) {
      //   let timer = duration;
      //   let timePosTip = duration; // Definir o valor inicial dos segundos
      //   let miliPosTip = 0; // Definir o valor inicial dos milissegundos

      //   const formatTime = (seconds, milliseconds) => {
      //       let formattedMinutes = '00';
      //       let formattedSeconds = seconds.toString().padStart(2, '0');
      //       let formattedMilliseconds = milliseconds.toString().padStart(2, '0');
      //       return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
      //   };

      //   const interval = setInterval(() => {
      //       if (timePosTip === 0 && miliPosTip === 0) {
      //           clearInterval(interval);
      //           this.savePointGame();
      //       } else {
      //           miliPosTip -= 1;
      //           if (miliPosTip < 0) {
      //               miliPosTip = 99;
      //               timePosTip -= 1;
      //           }
      //       }

      //       // Atualizar a exibição do contador
      //       const formattedTime = formatTime(timePosTip, miliPosTip);
      //       $(".info .value").text(formattedTime);
      //   }, 10); // Intervalo de atualização de 10 milissegundos (para corresponder ao intervalo do contador original)
      // },

      // countdownTimer(duration) {
      //   let timer = duration,
      //     minutes,
      //     seconds;
      //     const interval = setInterval(() => {
      //       minutes = parseInt(0);
      //       seconds = parseInt(timer % 60, 10);

      //       minutes = minutes < 10 ? "0" + minutes : minutes;
      //       seconds = seconds < 10 ? "0" + seconds : seconds;

      //       this.time = minutes + ":" + seconds;

      //       if (--timer < 0) {
      //         clearInterval(interval);
      //         this.time = "00:00:00";
      //         // alert("Tempo esgotado!");
      //         //navigate.goto(`05_ranking`);
      //         // this.savePointGame();
      //       }
      //     }, 1000);
      // },

      startGame() {
        this.started = true;
        // this.startTime = moment();

        // this.timer = setInterval(() => {
        //     this.time = moment( moment().diff(this.startTime)).format("mm:ss");
        // }, 1000);
      },

      flipCard(card) {
        if (card.found || card.flipped) return;

        if (!this.started) {
          this.startGame();
        }

        let flipCount = this.flippedCards().length;
        if (flipCount == 0) {
          card.flipped = !card.flipped;
        } else if (flipCount == 1) {
          card.flipped = !card.flipped;
          this.turns += 1;

          if (this.sameFlippedCard()) {
            // Match!
            this.flipBackTimer = setTimeout(() => {
              this.clearFlipBackTimer();
              this.setCardFounds();
              this.clearFlips();

              if (this.checkAllFound()) {
                this.savePointGame();
              }
            }, 200);
          } else {
            // Wrong match
            this.flipBackTimer = setTimeout(() => {
              this.clearFlipBackTimer();
              this.clearFlips();
            }, 1000);
          }
        }
      },

      clearFlips() {
        _.map(this.cards, (card) => (card.flipped = false));
      },

      clearFlipBackTimer() {
        clearTimeout(this.flipBackTimer);
        this.flipBackTimer = null;
      },
    },

    created() {
      this.resetGame();
    },
  });
});
