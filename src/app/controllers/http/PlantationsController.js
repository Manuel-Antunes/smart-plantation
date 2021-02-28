const Media = require('../../models/Media');
const Plantation = require('../../models/Plantation');

class PlantationsController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    try {
      const media =
        req.file &&
        (await Media.create({
          name: req.file.originalname,
          path: req.file.filename,
        }));
      console.log(req.body);
      const plantation = await Plantation.create({
        ...req.body,
        media_id: media && media.id,
        user_id: req.body.user_id || '13213123123',
      });
      return res.render(`plantation`, plantation);
    } catch (err) {
      console.log(err);
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
