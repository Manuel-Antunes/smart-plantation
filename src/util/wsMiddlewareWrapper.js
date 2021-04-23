const wrap = middleware => (socket, next) => {
  return middleware(socket.request, {}, next);
};
module.exports = { wrap };
