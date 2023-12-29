const Product = require("../modals/Product");
const amqp = require("amqplib");

async function getProduct(req, res) {
  try {
    const { _id } = req.body;
    const findProduct = await Product.findById(_id);
    if (findProduct) {
      console.log(findProduct);
      return res
        .status(200)
        .json({ message: "Product Got successfully", data: findProduct });
    } else {
      return res.status(404).json({ message: "Product Couldn't find!!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createProduct(req, res) {
  try {
    const { productName, productDescription, productPrice, stock } = req.body;
    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      stock,
    });
    if (newProduct) {
      console.log(newProduct);
      await newProduct.save();
      await connectAndSendToQueue(newProduct);
      return res
        .status(200)
        .json({ message: "Product successfully created!", data: newProduct });
    } else {
      return res.status(404).json({ message: "Product creation failed!!!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Product creation failed!" });
  }
}

async function editProduct(req, res) {
  try {
    const { productName, productDescription, productPrice, stock, _id } =
      req.body;
    // Update the product with a single query
    const updatedProduct = await Product.findOneAndUpdate(
      { _id },
      {
        $set: {
          productName,
          productDescription,
          productPrice,
          stock,
        },
      },
      { new: true } // Returns the updated document
    );
    if (updatedProduct) {
      await updatedProduct.save();
      console.log(updatedProduct);
      return res
        .status(200)
        .json({ message: "Product updated successfully! " });
    } else {
      return res.status(404).json({ message: "Product updated failed! " });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { _id } = req.body;
    const deleteProduct = await Product.findByIdAndDelete(_id);
    if (!deleteProduct) {
      return res
        .status(404)
        .json({ message: "Product couldn't be deleted!!" });
    }
    console.log("Product successfully deleted! ");
    return res
      .status(200)
      .json({ message: "Product successfully deleted!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function connectAndSendToQueue(newProduct) {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("product-details");
    await channel.sendToQueue(
      "product-details",
      Buffer.from(JSON.stringify(newProduct))
    );
    await channel.close();
    await connection.close();
  } catch (err) {
    console.error(err);
    throw new Error("Error connecting to RabbitMQ");
  }
}

module.exports = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
