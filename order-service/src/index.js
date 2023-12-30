const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 3002;
const mongoose = require("mongoose");
const orderRoutes = require("../src/routes/orderRoute");
const { ProductModel } = require("./modal/productModal");
const { UserModel } = require("./modal/userModal");
const { OrderModel } = require("./modal/orderModal");
const amqp = require("amqplib");

var productChannel;
var userChannel;
var connection;

async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    console.log("Connection to RabbitMQ established");
    productChannel = await connection.createChannel();
    userChannel = await connection.createChannel();
    console.log("Channel created");
    await productChannel.assertQueue("product-details");
    await userChannel.assertQueue("user-details");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
}

async function setupProductConsumer() {
  try {
    console.log("inside the setuporderconsumer");
    await connect();

    await productChannel.consume(
      "product-details",
      async (data) => {
        if (data && data.content) {
          const contentString = data.content.toString();
          console.log(
            "Received content from product-details queue:",
            contentString
          );
          try {
            const product = JSON.parse(contentString);
            const productFind = await ProductModel.findOne({
              productname: product.productname,
            });
            console.log(productFind);
            if (!productFind) {
              const newOrder = new ProductModel(product);
              await newOrder.save();
              productChannel.ack(data);
              console.log("Order saved:", newOrder);
            }
          } catch (err) {
            console.error("Error parsing JSON:", err);
          }
        }
      },
      { noAck: false }
    );
  } catch (err) {
    console.error("Error setting up order consumer:", err);
    throw err;
  }
}

async function setupUserConsumer() {
  try {
    await connect();

    await userChannel.consume(
      "user-details",
      async (data) => {
        if (data && data.content) {
          const contentString = data.content.toString();
          console.log(
            "Received content from user-details queue:",
            contentString
          );

          try {
            const user = JSON.parse(contentString);
            const newUser = new UserModel(user);
            await newUser.save();
            userChannel.ack(data);
            console.log("User saved:", newUser);
          } catch (err) {
            console.error("Error parsing JSON:", err);
          }
        }
      },
      { noAck: false }
    );
  } catch (err) {
    console.error("Error setting up user consumer:", err);
    throw err;
  }
}

Promise.all([setupProductConsumer(), setupUserConsumer()])
  .then(() => {
    const app = express();
    app.use(express.json());

    app.use(orderRoutes);

    app.listen(3000, () => {
      console.log("Connected to port 3000");
    });
  })
  .catch((err) => {
    console.error("Error starting the server:", err);
  });

app.use(express.json());

mongoose
  .connect("mongodb://localhost/Order-Service2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Order-Service2 DB Connected");
  })
  .catch((error) => {
    console.error("Error connecting to Order-Service2 DB:", error);
  });

app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`Order-Service2 is running at ${PORT}`);
});
