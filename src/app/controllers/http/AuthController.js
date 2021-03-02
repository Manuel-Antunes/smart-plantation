const User = require('../../models/User');
const firebase = require('../../../services/firebase');

class AuthController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      const fbUser = await firebase.auth();
      console.log(fbUser);
      await User.create({
        id: fbUser.uid,
        name: fbUser.displayName,
      });
      return res.redirect('/');
    } catch (err) {
      console.log(err);
      return res.status(400).render('createUser', err);
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
