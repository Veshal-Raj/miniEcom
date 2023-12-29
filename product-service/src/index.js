const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 3003;
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoute");

app.use(express.json());

mongoose
  .connect("mongodb://localhost/Product-Service2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Product-Service2 DB Connected");
  })
  .catch((error) => {
    console.error("Error connecting to Product-Service2 DB:", error);
  });

app.use(productRoutes);

app.listen(PORT, () => {
  console.log(`Order-Service2 is running at ${PORT}`);
});


// const express = require("express");
// const app = express();
// const PORT = process.env.PORT_ONE || 3003;
// const mongoose = require("mongoose");
// const Product = require("./modals/Product");
// const jwt = require("jsonwebtoken");
// const amqp = require("amqplib");
// var channel, connection;

// app.use(express.json());

// mongoose
//   .connect("mongodb://localhost/Product-Service2", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Product-Service2 DB Connected");
//   })
//   .catch((error) => {
//     console.error("Error connecting to Product-Service2 DB:", error);
//   });

// connect();
// async function connect() {
//   try {
//     const amqpServer = "amqp://localhost:5672";
//     connection = await amqp.connect(amqpServer);
//     channel = await connection.createChannel();
//     await channel.assertQueue("product-details"); // this will create a queue named product-details, if there is no queue
//   } catch (err) {
//     console.error(err);
//     throw new Error("Error connecting to RabbitMQ");
//   }
// }

// // Listen for the "beforeExit" event to close the connection and channel
// process.on("beforeExit", async () => {
//   if (channel) await channel.close();
//   if (connection) await connection.close();
// });

// // Get Product
// app.post("/auth/getProduct", async (req, res) => {
//   const { _id } = req.body;
//   const findProduct = await Product.findById(_id);
//   if (findProduct) {
//     console.log(findProduct);
//     return res
//       .status(200)
//       .json({ message: "Product Got successfully", data: findProduct });
//   } else {
//     return res.status(404).json({ message: "Product Couldn't find!!" });
//   }
// });

// // Create Product
// app.post("/auth/createProduct", async (req, res) => {
//   try {
//     const { productName, productDescription, productPrice, stock } = req.body;
//     const newProduct = new Product({
//       productName,
//       productDescription,
//       productPrice,
//       stock,
//     });
//     if (newProduct) {
//       console.log(newProduct);
//       await newProduct.save();
//       await connect();
//       await channel.sendToQueue(
//         "product-details",
//         Buffer.from(JSON.stringify(newProduct))
//       );
//       return res.status(200).json({ message: "Product successfully created!", data: newProduct });
//     } else {
//       return res.status(404).json({ message: "Product creation failed!!!" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Product creation failed!" });
//   } finally {
//     // Close the channel and connection in the finally block
//     if (channel) await channel.close();
//     if (connection) await connection.close();
//   }
// });

// // Edit Product
// app.post("/auth/editProduct", async (req, res) => {
//   const { productName, productDescription, productPrice, stock, _id } =
//     req.body;
//   // Update the product with a single query
//   const updatedProduct = await Product.findOneAndUpdate(
//     { _id },
//     {
//       $set: {
//         productName,
//         productDescription,
//         productPrice,
//         stock,
//       },
//     },
//     { new: true } // Returns the updated document
//   );
//   if (updatedProduct) {
//     await updatedProduct.save();
//     console.log(updatedProduct);
//     return res.status(200).json({ message: "Product updated successfully! " });
//   } else {
//     return res.status(404).json({ message: "Product updated failed! " });
//   }
// });

// // Delete product
// app.post("/auth/deleteProduct", async (req, res) => {
//   const { _id } = req.body;
//   const deleteProduct = await Product.findByIdAndDelete(_id);
//   if (!deleteProduct) {
//     return res.status(404).json({ message: "Product couldn't deleted!!" });
//   }
//   console.log("Product successfully deleted! ");
//   return res.status(200).json({ message: "Product successfully deleted!" });
// });

// app.listen(PORT, () => {
//   console.log(`Order-Service2 is running at ${PORT}`);
// });