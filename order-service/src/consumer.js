const amqp = require("amqplib");
const UserModel = require("./modal/userModal");
const ProductModel = require("./modal/productModal");

async function consumeUserDetails() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue("user-details");

  channel.consume(
    "user-details",
    async (msg) => {
      try {
        const userData = JSON.parse(msg.content.toString());
        console.log("Received User Details:", userData);
        const newUser = await new UserModel(userData);
        await newUser.save();
        console.log("Stored User Details: ", newUser);
      } catch (error) {
        console.error("Error processing user details: ", error);
      }
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
    async (msg) => {
      try {
        const productData = JSON.parse(msg.content.toString());
        console.log("Recieved Product Details:", productData);
        const newProduct = await new ProductModel(productData);
        await newProduct.save();
        console.log("Stored Product details: ", newProduct);
      } catch (error) {
        console.error("Error processing user details: ", error);
      }
    },
    { noAck: true }
  );
}

// Call these functions when needed
consumeUserDetails();
consumeProductDetails();
