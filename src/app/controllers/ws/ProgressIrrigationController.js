class ProgessIrrigationController {
  static handle(data, io) {
    io.emit('dados', data * 10);
  }
}
module.exports = ProgessIrrigationController;
