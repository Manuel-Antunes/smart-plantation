const firebase = require('../../services/firebase');
const User = require('../models/User');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {function} next
 */
async function authMiddleware(req, res, next) {
  console.log(req.cookies.token);
  if (req.cookies.token) {
    try {
      const fbUser = await firebase.auth().verifyIdToken(req.cookies.token);
      const user = await User.findOne({
        where: {
          id: fbUser.uid,
        },
      });
      req.user = user;
      return next();
    } catch (err) {
      return res
        .status(401)
        .json({ error: 'ocorreu um erro na autenticão', err });
    }
  } else {
    return res.status(401).json({ error: 'user must to be logged in' });
  }
}
module.exports = authMiddleware;
