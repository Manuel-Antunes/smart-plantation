const ProgressIrrigationController = require('../app/controllers/mqtt/ProgressIrrigationController');

/**
 *
 * @param {import('mosca').Packet} packet
 * @param {import('mosca').Client} client
 * @param {import('mosca').Server} mosca
 */
function routePackets(packet, client, mosca) {
  switch (packet.topic) {
    case 'PLANTATION':
      ProgressIrrigationController.handle(packet, client, mosca);
      break;
    default:
      break;
  }
}

module.exports = { routePackets };
