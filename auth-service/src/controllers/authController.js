const User = require("../modals/User");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");

async function signUp(req, res) {
  try {
    const { email, password, name } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ message: "User is already exists! " });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      return res.json(newUser);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function signIn(req, res) {
  try {
    const { email, password, name } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist)
      return res.json({
        message: "User doesn't exist, create an account first!",
      });
    else {
      // Check password
      if (password !== userExist.password) {
        return res.json({ message: "Password is not MATCH!!" });
      }
      console.log('user --> ',userExist)
      const payload = {
        id: userExist._id,
        name: userExist.name,
        email,
      };

      jwt.sign(payload, "secret", (err, token) => {
        if (err) console.log(err);
        else {
          return res.json({ token: token });
        }
      });
      await connectAndSendToQueue(payload);
      return;
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function connectAndSendToQueue(payload) {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("user-details");
    await channel.sendToQueue(
      "user-details",
      Buffer.from(JSON.stringify(payload))
    );
    await channel.close();
    await connection.close();
  } catch (err) {
    console.error(err);
    throw new Error("Error connecting to RabbitMQ");
  }
}

module.exports = {
  signUp,
  signIn,
};
