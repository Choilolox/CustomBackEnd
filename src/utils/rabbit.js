const amqp = require("amqplib");

let channel;

async function connect() {
  if (!channel) {
    const conn = await amqp.connect(process.env.RABBITMQ_URI || "amqp://localhost");
    channel = await conn.createChannel();
    await channel.assertQueue("conversions");
  }
  return channel;
}

exports.publish = async (queue, msg) => {
  const ch = await connect();
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
};