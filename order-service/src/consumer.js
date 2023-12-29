const amqp = require("amqplib");

async function consumeUserDetails() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue("user-details");

  channel.consume(
    "user-details",
    (msg) => {
      const userData = JSON.parse(msg.content.toString());
      console.log("Received User Details:", userData);
    },
    { noAck: true }
  );
}

async function consumeProductDetails() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue("product-details");

  channel.consume(
    "product-details",
    (msg) => {
      const productData = JSON.parse(msg.content.toString());
      console.log("Recieved Product Details:", productData);
    },
    { noAck: true }
  );
}

// Call these functions when needed
consumeUserDetails()
consumeProductDetails()