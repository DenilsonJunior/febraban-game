window.firebaseConfig = {
  apiKey: "AIzaSyC6r6ivnQ7Lx1Hikb_YNdQxf3lj2XOGkWA",
  authDomain: "febraban-v1.firebaseapp.com",
  databaseURL: "https://febraban-v1-default-rtdb.firebaseio.com",
  projectId: "febraban-v1",
  storageBucket: "febraban-v1.appspot.com",
  messagingSenderId: "824190571881",
  appId: "1:824190571881:web:370fe41aa5d1ece5ab19f8",
  measurementId: "G-1NV8HNSJZJ",
};

function addOrUpdateDocument(db, collectionName, docId, data) {
  try {
    db.collection(collectionName)
      .doc(docId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          db.collection(collectionName)
            .doc(docId)
            .update(data)
            .then(() => {
              console.log("Document successfully update!");
            })
            .catch((error) => {
              console.error("Error update: ", error);
            });
        } else {
          db.collection(collectionName)
            .doc(docId)
            .set(data)
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error set:", error);
      });
  } catch (error) {
    console.error("Erro ao adicionar ou atualizar documento: ", error);
  }
}

window.initFirebase = false;
$(document).ready(function () {
  if (!window.initFirebase) {
    ///inicializar

    const firebaseApp = firebase.initializeApp(window.firebaseConfig);
    const db = firebaseApp.firestore();

    console.log(db);
    window.initFirebase = true;

    const _nome = "Nilo";
    const _email = "sssnocs@nilo.ar";
    const _empresa = "nil S.A";
    const _autorizacao = true;

    const collection = "usuarios";
    const data = {
      nome: _nome,
      email: _email,
      empresa: _empresa,
      autorizacao: _autorizacao,
    };

    addOrUpdateDocument(db, collection, _email, data);
  }
});
