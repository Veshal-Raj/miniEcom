const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 3001;
const mongoose = require("mongoose");
const authRoutes = require("../src/routes/authRoute");

app.use(express.json());

mongoose
  .connect("mongodb://localhost/auth-Service2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Auth-Service2 DB Connected");
  })
  .catch((error) => {
    console.error("Error connecting to Auth-Service2 DB:", error);
  });

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Auth-Service2 is running at ${PORT}`);
});


