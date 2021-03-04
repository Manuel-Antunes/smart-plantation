var avatar = document.getElementById('photo-avatar');
const username = document.getElementById('username');
async function setNavData(user) {
  avatar.src = user.photoURL ? user.photoURL : "http://www.darylroththeatre.com/wp-content/uploads/2018/10/avatar-placeholder.png";
  username.innerHTML = user.displayName;
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    setNavData(user);
  } else {
    // No user is signed in.
  }
});
