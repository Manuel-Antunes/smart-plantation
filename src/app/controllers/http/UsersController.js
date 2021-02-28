const User = require('../../models/User');

class UsersController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: { message: 'an error' } });
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
