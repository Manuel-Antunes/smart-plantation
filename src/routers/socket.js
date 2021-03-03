const ProgessIrrigationController = require('../app/controllers/ws/ProgressIrrigationController');

/**
 *
 * @param {import('socket.io').Socket} io
 */
function startSockets(io) {
  io.on('jooj', d => ProgessIrrigationController.handle(d, io));
}
module.exports = startSockets;
