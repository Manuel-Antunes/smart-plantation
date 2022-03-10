const firebase = require('../../../../services/firebase');
const User = require('../../../models/User');

class AuthController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    const expiresIn = 1000 * 60 * 60 * 24 * 7;
    const idToken = req.body.idToken.toString();
    try {
      const sessionCookie = await firebase
        .auth()
        .createSessionCookie(idToken, { expiresIn });
      const fbCooked = await firebase.auth().verifyIdToken(idToken);
      const fbUser = await firebase.auth().getUser(fbCooked.uid);
      const [user] = await User.findCreateFind({
        where: { id: fbUser.uid },
        defaults: {
          id: fbUser.uid,
          name: fbUser.displayName,
        },
      });
      return res.json({ sessionCookie, user, fbUser });
    } catch (err) {
      req.flash('error_message', err.message);
      return res.status(400).json({ message: err.message });
    }
  }

  // /**
  //  * @param {import('express').Request} req
  //  * @param {import('express').Response} res
  //  */
  // async show(req, res) { }

  // /**
  //  * @param {import('express').Request} req
  //  * @param {import('express').Response} res
  //  */
  // async index(req, res) { }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async destroy(req, res) {
    res.clearCookie('token');
    res.redirect('/');
  }

  // /**
  //  * @param {import('express').Request} req
  //  * @param {import('express').Response} res
  //  */
  // async update(req, res) { }
}

module.exports = new AuthController();
