const Cache = require('../../../lib/Cache');
const Plantation = require('../../models/Plantation');

class ProgessIrrigationController {
  /**
   *
   * @param {import('mosca').Packet} packet
   * @param {import('mosca').Client} client
   * @param {import('mosca').Server} mosca
   */
  static async handle(packet, client, mosca) {
    const data = packet.payload.toString();
    mosca.io
      .of('/plantation')
      .in(client.id)
      .emit('dados', data);
    const plantation = await Plantation.findByPk(client.id);
    if (plantation) {
      await Cache.set(`plantation:${client.id}:hresource`, {
        value: data,
      });
    }
  }
}
module.exports = ProgessIrrigationController;
