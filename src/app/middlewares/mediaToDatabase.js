const Media = require('../models/Media');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {function} next
 */
async function mediaToDatabase(req, res, next) {
  console.log(req.file);
  if (req.file) {
    const media =
      req.file &&
      (await Media.create({
        name: req.file.originalname,
        path: req.file.filename,
      }));
    req.file.dbMedia = media;
  }
  return next();
}
module.exports = mediaToDatabase;
