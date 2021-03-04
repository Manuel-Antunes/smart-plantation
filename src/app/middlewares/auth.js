const firebase = require('../../services/firebase');
const User = require('../models/User');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {function} next
 */
async function authMiddleware(req, res, next) {
  if (req.cookies.token) {
    try {
      const fbCooked = await firebase
        .auth()
        .verifySessionCookie(req.cookies.token);
      const fbUser = await firebase.auth().getUser(fbCooked.uid);
      const [user] = await User.findCreateFind({
        where: { id: fbUser.uid },
        defaults: {
          id: fbUser.uid,
          name: fbUser.displayName,
        },
      });
      user.firebaseData = fbUser;
      req.user = user;
      return next();
    } catch (err) {
      if (res.clearCookie) {
        res.clearCookie('token');
        req.flash('error_message', err.message);
        return res.status(401).redirect('/');
      }
    }
  } else if (res.status) {
    req.flash('error_message', 'an error occurred');
    return res.status(401).redirect('/');
  }
  return res;
}
module.exports = authMiddleware;
