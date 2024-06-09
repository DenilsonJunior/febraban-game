var countdownTimer = function (duration, call) {
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
      call();
    }
  }, 1000);
};
