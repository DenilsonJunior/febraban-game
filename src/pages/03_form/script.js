$(document).ready(function () {
  var game = localStorage.getItem("game");

  $(".cadastro").on("click", function () {
    var name = $("#name").val();
    var email = $("#email").val();
    var empresa = $("#empresa").val() || "não defina";

    $(".alertName").css("display", "none");
    $(".alertMail").css("display", "none");

    if (name.length == 0) {
      $(".alertName").css("display", "block");
      return false;
    }
    if (email.length == 0 || !validateEmail(email)) {
      $(".alertEmail").css("display", "block");
      return false;
    }

    var informativo = $("#informativo").is(":checked");

    var data = {
      name: name,
      email: email,
      empresa: empresa,
      informativo: informativo,
    };

    //localstorage
    $("body").trigger("setOrUpdateObject", ["user", data]);
    //firebase
    bridge.handlerFormDB(data);

    setTimeout(() => {
      navigate.goto(`04_game${game}-intro`);
    }, 1000 * 0.12);
  });

  function validateEmail(email) {
    // Advanced regex for email validation
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  setTimeout(() => {
    bridge.handlerSnapshotFormDB((change) => {
      console.log(change.doc.data());
      const data = change.doc.data();

      //localstorage
      $("body").trigger("setOrUpdateObject", ["user", data]);
      setTimeout(() => {
        navigate.goto(`04_game${game}-intro`);
      }, 1000 * 0.12);
    });
  }, 1000 * 2);
});
