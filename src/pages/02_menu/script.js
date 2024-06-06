$(document).ready(function () {
  // localStorage.celar();
  localStorage.clear();

  $(".menu").on("click", function () {
    localStorage.setItem("game", $(this).attr("game"));
    navigate.next();
  });
});
