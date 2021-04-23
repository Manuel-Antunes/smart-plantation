class Client {
  constructor(host, opt) {
    /**
     * @type {import('socket.io-client')}
     */
    this.socket = io(host, opt);
    console.log('foi');
  }
}

export default Client;
