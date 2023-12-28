const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 3003;
const mongoose = require("mongoose");
const Product = require("./Product");
const jwt = require("jsonwebtoken");

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

// Get Product
app.post("/getProduct", async(req,res) => {
    const {_id} = req.body;
    const findProduct = await Product.findById(_id)
    if (findProduct) {
        console.log(findProduct)
        return res.status(200).json({ message: 'Product Got successfully', data: findProduct})
    } else {
        return res.status(404).json({message: "Product Couldn't find!!"})
    }

})

// Create Product
app.post("/createProduct", async (req, res) => {
  const { productName, productDescription, productPrice } = req.body;
  const newProduct = new Product({
    productName,
    productDescription,
    productPrice,
  });
  if (newProduct) {
      console.log(newProduct)
      await newProduct.save();
      return res.status(200).json({ message: "Product successfully created!" });
  } else {
    return res.status(404).json({ message: "Product creation failed!!!" });
  }
});


// Edit Product
app.post("/editProduct", async(req,res) => {
    const { productName, productDescription, productPrice, _id } = req.body;
     // Update the product with a single query
     const updatedProduct = await Product.findOneAndUpdate(
        { _id },
        {
            $set: {
                productName,
                productDescription,
                productPrice
            }
        },
        { new: true } // Returns the updated document
    );
    if (updatedProduct) {
        await updatedProduct.save()
        console.log(updatedProduct)
        return res.status(200).json({ message: 'Product updated successfully! '})
    } else {
        return res.status(404).json({ message:'Product updated failed! '})
    }
})


// Delete product
app.post("/deleteProduct", async(req,res) => {
    const { _id } = req.body;
    const deleteProduct = await Product.findByIdAndDelete(_id)
        if (!deleteProduct) {
            return res.status(404).json({ message: "Product couldn't deleted!!"})
        }
        console.log("Product successfully deleted! ")
        return res.status(200).json({ message: "Product successfully deleted!"})
})


app.listen(PORT, () => {
  console.log(`Order-Service2 is running at ${PORT}`);
});
