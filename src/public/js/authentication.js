// Buttons
var authEmailPassButton = document.getElementById('default-auth');
var authGoogleButton = document.getElementById('google-button');
var createUserButton = document.getElementById('create-user');
var emailInput = document.getElementById('email')
var passwordInput = document.getElementById('password')
var nameInput = document.getElementById('name')
var image = document.getElementById('image')
// var logOutButton = document.getElementById('logOutButton');
// alert('foi')
// Inputs
createUserButton?.addEventListener('click', function (e) {
  form.submit();
});
var form = document.getElementById('formulario');
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

var user;
// Displays
var displayName = document.getElementById('displayName');
// Criar novo usuário
// firebase.auth().onAuthStateChanged(() => {
//   if (firebase.auth().currentUser) {
//     user = firebase.auth().currentUser.toJSON();
//     console.log(user.displayName);
//     let profile = document.createElement("img");
//     profile.src = user.photoURL;
//     profile.style.width = "50px";
//     profile.style.height = "50px";
//     profile.style.borderRadius = "100%";
//     let newString = "";

//     for (let i = 0; i < 30; i++) {
//       if (user.displayName[i] != " ") {
//         newString = newString + user.displayName[i];
//       } else {
//         break;
//       }
//     }
//     document.getElementById("logcamp").style.display = "none";
//     document.getElementById("displayName").innerHTML = newString + "       ";
//     document.getElementById("displayName").appendChild(profile);
//     logOutButton.style.display = "block";
//   }
// })
// Autenticar com E-mail e Senha
authEmailPassButton?.addEventListener('click', function (e) {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(async function (result) {
      var token = await result.user.getIdToken();
      console.log(token);
      document.cookie = "token=" + token + ";";
      form.submit();
    })
    .catch(function (error) {
      console.error(error.code);
      console.error(error.message);
      alert('Falha ao autenticar')
    });
});

// Logout
// logOutButton.addEventListener('click', function () {
//   firebase
//     .auth()
//     .signOut()
//     .then(function () {
//       displayName.innerText = 'Você não está autenticado';
//       window.location.href = '/';
//     }, function (error) {
//       console.error(error);
//     });

// });




// Autenticar com Google
authGoogleButton?.addEventListener('click', function (e) {
  // Providers
  e.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  signIn(provider, e.target);
});



function signIn(provider) {
  firebase.auth()
    .signInWithPopup(provider)
    .then(async function (result) {
      console.log(result);
      var token = await result.user.getIdToken();
      document.cookie = "token=" + token + ";";
      form.submit();
    }).catch(function (error) {
      console.log(error);
      alert('Falha na autenticação');
    });

}
