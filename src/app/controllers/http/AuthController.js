const firebase = require('../../../services/firebase');

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
      const options = { maxAge: expiresIn, httpOnly: true, secure: true };
      res.cookie('token', sessionCookie, options);
      return res.json({ sessionCookie });
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
