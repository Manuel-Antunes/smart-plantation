const Cache = require('../../../lib/Cache');

class ProgessIrrigationController {
  static async handle(data, io) {
    const cacheKey = `plantation:${data}:hresource`;
    const cached = await Cache.get(cacheKey);
    io.emit('dados', cached.value);
  }
}
module.exports = ProgessIrrigationController;
