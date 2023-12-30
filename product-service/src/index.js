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
