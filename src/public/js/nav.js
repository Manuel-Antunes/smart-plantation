var avatar = document.getElementsByClassName('photo-avatar');
const username = document.getElementsByClassName('fb-username');
const email = document.getElementsByClassName('fb-email');
const button = document.getElementById('clickToOpenMenu');
button.addEventListener('click', () => {
  const subMenu = document.querySelector('.sub-menu');
  if (subMenu.classList.contains('active')) {
    subMenu.classList.remove('active');
  } else {
    subMenu.classList.add('active');
  }
})
async function setNavData(user) {
  for (let i = 0; i < avatar.length; i++) {
    const e = avatar[i];
    e.src = user.photoURL ? user.photoURL : "http://www.darylroththeatre.com/wp-content/uploads/2018/10/avatar-placeholder.png";
  }
  for (let i = 0; i < username.length; i++) {
    const e = username[i];
    e.innerHTML = user.displayName;
  }
  for (let i = 0; i < email.length; i++) {
    const e = email[i];
    e.innerHTML = user.email;
  }
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    setNavData(user);
  } else {
    // No user is signed in.
  }
});
