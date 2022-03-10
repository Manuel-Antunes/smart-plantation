const User = require('../../../models/User');
const firebase = require('../../../../services/firebase');

class UsersController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      const fbUser = await firebase.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.name,
        photoURL: `${process.env.HOST}/files/${req.file.filename}`,
      });
      const user = await User.create({
        id: fbUser.uid,
        name: fbUser.displayName,
      });
      return res.json({ user });
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

  // /**
  //  * @param {import('express').Request} req
  //  * @param {import('express').Response} res
  //  */
  // async destroy(req, res) { }

  // /**
  //  * @param {import('express').Request} req
  //  * @param {import('express').Response} res
  //  */
  // async update(req, res) { }
}

module.exports = new UsersController();
