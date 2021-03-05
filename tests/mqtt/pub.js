require('dotenv/config');

const mqtt = require('mqtt');
const express = require('express');

const app = express();
class PlantationMqtt {
  constructor(client_id, TOPIC) {
    this.client = mqtt.connect(
      `${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
      { clientId: client_id }
    );
    this.TOPIC = TOPIC;
    this.client.on('connect', () => {
      console.log('connected');
    });
  }

  sendMessageToServer(message) {
    if (this.client.connected) {
      console.log(message);
      this.client.publish(this.TOPIC, message);
    } else {
      console.log('the client is not connected');
    }
  }
}
const plantation = new PlantationMqtt('1', 'PLANTATION');
app.get('/:id', (req, res) => {
  plantation.sendMessageToServer(req.params.id);
  res.send('ok');
});

app.listen(3030, () => {
  console.log('runnning in port:3030');
});
