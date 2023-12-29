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


// const express = require("express");
// const app = express();
// const PORT = process.env.PORT_ONE || 3001;
// const mongoose = require("mongoose");
// const User = require("./modals/User");
// const jwt = require("jsonwebtoken");
// const amqp = require("amqplib");
// var channel, connection;

// app.use(express.json());

// mongoose
//   .connect("mongodb://localhost/auth-Service2", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Auth-Service2 DB Connected");
//   })
//   .catch((error) => {
//     console.error("Error connecting to Auth-Service2 DB:", error);
//   });

// connect();
// async function connect() {
//   try {
//     const amqpServer = "amqp://localhost:5672";
//     connection = await amqp.connect(amqpServer);
//     channel = await connection.createChannel();
//     await channel.assertQueue("user-details"); // this will create a queue named user-details, if there is no queue
//   } catch (err) {
//     console.error(err);
//     throw new Error("Error connecting to RabbitMQ");
//   }
// }

// // Listen for the "beforeExit" event to close the connection and channel
// process.on('beforeExit', async () => {
//   if (channel) await channel.close();
//   if (connection) await connection.close();
// });

// // Sign up
// app.post("/auth/sign-up", async (req, res) => {
//   const { email, password, name } = req.body;

//   const userExist = await User.findOne({ email });
//   if (userExist) {
//     return res.json({ message: "User is already exists! " });
//   } else {
//     const newUser = new User({
//       name,
//       email,
//       password,
//     });
//     await newUser.save();
//     return res.json(newUser);
//   }
// });

// // Sign in
// app.post("/auth/sign-in", async (req, res) => {
//   try {
//     const { email, password, name } = req.body;
//     const userExist = await User.findOne({ email });
//     if (!userExist)
//       return res.json({
//         message: "User doesn't exist, create an account first!",
//       });
//     else {
//       // Check password
//       if (password !== userExist.password) {
//         return res.json({ message: "Password is not MATCH!!" });
//       }
//       console.log('user --> ',userExist)
//       const payload = {
//         id: userExist._id,
//         name: userExist.name,
//         email,
//       };

//       jwt.sign(payload, "secret", (err, token) => {
//         if (err) console.log(err);
//         else {
//           return res.json({ token: token });
//         }
//       });
//       await connect();
//       await channel.sendToQueue(
//         "user-details",
//         Buffer.from(JSON.stringify(payload))
//       );
//       // await channel.close(); // Here the channel and the connection is closing after sending to queue
//       // await connection.close(); // so you will get error when you make request after the channel close.
//     }
//   } catch (error) {
//     console.error(error);
//   }  finally {
//     // Close the channel and connection in the finally block
//     if (channel) await channel.close();
//     if (connection) await connection.close();
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Auth-Service2 is running at ${PORT}`);
// });
