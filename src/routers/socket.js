const cp = require('cookie-parser');
const ProgessIrrigationController = require('../app/controllers/ws/ProgressIrrigationController');
const authMiddleware = require('../app/middlewares/auth');
const { wrap } = require('../util/wsMiddlewareWrapper');

/**
 *
 * @param {import('socket.io').Socket} socket
 */
function startSockets(socket) {
  socket.on('jooj', d => ProgessIrrigationController.handle(d, socket));
}
/**
 *
 * @param {import('socket.io').Server} io
 */
function defineNamespace(io) {
  io.of('/plantation').on('connect', socket => {
    const { id } = socket.handshake.query;
    socket.join(id);
    socket.on('jooj', d => ProgessIrrigationController.handle(d, socket));
  });
  io.of('/plantations')
    .use(wrap(cp()))
    .use(wrap(authMiddleware))
    .on('connect', socket => {
      // console.log(socket.request.user);
    });
}
module.exports = { startSockets, defineNamespace };
