window.countdownTimer = function (duration, call) {
  // let timer = duration,
  //   minutes,
  //   seconds;
  // const interval = setInterval(() => {
  //   minutes = parseInt(timer / 60, 10);
  //   seconds = parseInt(timer % 60, 10);

  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   seconds = seconds < 10 ? "0" + seconds : seconds;

  //   $(".info .value").text(minutes + ":" + seconds);

  //   if (--timer < 0) {
  //     clearInterval(interval);
  //     this.time = "00:00";
  //     $(".info .value").text("00:00");
  //     // alert("Tempo esgotado!");
  //     call();
  //   }
  // }, 1000);

  let timePosTip = duration; // Definir o valor inicial dos segundos
  let miliPosTip = 0;

  const formatTime = (seconds, milliseconds) => {
    let formattedMinutes = "00";
    let formattedSeconds = seconds.toString().padStart(2, "0");
    let formattedMilliseconds = milliseconds.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  const interval = setInterval(() => {
    if (timePosTip === 0 && miliPosTip === 0) {
      clearInterval(interval);
      $(".info .value").text("00:00:00");
      call();
    } else {
      miliPosTip -= 1;
      if (miliPosTip < 0) {
        miliPosTip = 99;
        timePosTip -= 1;
      }
    }

    // Atualizar a exibição do contador
    const formattedTime = formatTime(timePosTip, miliPosTip);
    $(".info .value").text(formattedTime);
  }, 10);
};
