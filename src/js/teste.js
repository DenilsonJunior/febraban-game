var _id = "febraban12";
var _email = "sassssAASdXXFFFFa@yah.com";

///Verifica se já foi criado o User
firebase
  .auth()
  .fetchProvidersForEmail(_email)
  .then(function (data) {
    ///email já existente
    if (data.length > 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(_email, _id)
        .then((user) => {
          console.log("logado: " + user.uid);
          //course.scorm_set_suspendData("uid", user.uid);
          //questionInit();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    } else {
      ///Criar um novo user
      firebase
        .auth()
        .createUserWithEmailAndPassword(_email, _id)
        .then((user) => {
          console.log("criado: " + user.uid);
          //   course.scorm_set_suspendData("uid", user.uid);
          //   questionInit();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    }
  });
