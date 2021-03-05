require('dotenv/config');

const mqtt = require('mqtt');

const client = mqtt.connect(
  `${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`
);

let TOPIC = 'PLANTATION1';
client.on('message', (_TOPIC, message) => {
  message = message.toString();
  TOPIC = 'PLANTATION' ? 'PLANTATION1' : 'PLANTATION';
  client.subscribe(TOPIC);
  console.log(message);
});

client.on('connect', () => {
  client.subscribe(TOPIC);
  console.log('foi');
});
