require('dotenv/config');

const mqtt = require('mqtt');

const client = mqtt.connect(
  `${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`,
  {}
);

let TOPIC = 'PLANTATION';
const message = 'Hello World!';

client.on('connect', () => {
  setInterval(() => {
    client.publish(TOPIC, message);
    TOPIC = 'PLANTATION' ? 'PLANTATION1' : 'PLANTATION';
    console.log('Message sent');
  }, 5000);
});
