const Plantation = require('../../models/Plantation');

class PlantationsController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      const plantation = await Plantation.create(req.body);
      return res.render(`plantation/${req.body.name}`, plantation);
    } catch (err) {
      return res
        .status(400)
        .render('index', { error: { message: 'an error' } });
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

module.exports = new PlantationsController();
