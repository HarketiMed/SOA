const { Kafka } = require('kafkajs');
const config = require('../config');

const kafka = new Kafka({
  clientId: 'api-gateway',
  brokers: config.KAFKA_BROKERS
});

const producer = kafka.producer();

async function sendFeedbackToKafka(feedback) {
  await producer.connect();
  await producer.send({
    topic: 'feedback-topic',
    messages: [{ value: JSON.stringify(feedback) }],
  });
}

module.exports = { sendFeedbackToKafka };