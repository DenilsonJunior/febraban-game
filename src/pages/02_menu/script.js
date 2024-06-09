$(document).ready(function () {
  // localStorage.celar();

  $(".menu").on("click", function () {
    localStorage.setItem("game", $(this).attr("game"));
    navigate.next();
  });
});
