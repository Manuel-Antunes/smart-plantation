const Cache = require('../../../lib/Cache');

class ProgessIrrigationController {
  static async handle(data, socket) {
    const cacheKey = `plantation:${data}:hresource`;
    const cached = await Cache.get(cacheKey);
    socket.emit('dados', cached && cached.value);
  }
}
module.exports = ProgessIrrigationController;
