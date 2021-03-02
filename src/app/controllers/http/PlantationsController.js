const Plantation = require('../../models/Plantation');

class PlantationsController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      const plantation = await Plantation.create({
        ...req.body,
        media_id: req.file && req.file.dbMedia.id,
        user_id: req.user.get('id'),
      });
      return res.render(`plantation`, plantation);
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

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const plantations = await Plantation.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [{ association: 'logo' }],
    });
    const ps = plantations.map(p => {
      const plant = p.get();
      console.log(plant.media_id);
      if (p.get('logo')) {
        console.log(p.get('logo'));
        plant.logo = p.get('logo').get();
      }
      return plant;
    });
    res.render('plantations', {
      plantations: ps,
    });
  }

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
