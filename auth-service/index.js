const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 3001;
const mongoose = require('mongoose')
const User = require('./User')
const jwt = require('jsonwebtoken')

app.use(express.json())

mongoose.connect('mongodb://localhost/auth-Service2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Auth-Service2 DB Connected');
    })
    .catch((error) => {
        console.error('Error connecting to Auth-Service2 DB:', error);
    });


// Sign up
app.post('/auth/sign-up', async (req,res) => {
    const { email, password , name } = req.body
    
    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.json({ message: 'User is already exists! '})
    } else {
        const newUser = new User({
            name, 
            email,
            password
        })
        await newUser.save()
        return res.json(newUser)
    }
})

// Sign in
app.post('/auth/sign-in', async (req, res) =>{
    const { email, password, name } = req.body
    const userExist = await User.findOne({ email })
    if (!userExist) return res.json({ message: "User doesn't exist, create an account first!"})
    else {
        // Check password
        if (password !== userExist.password) {
            return res.json({ message: 'Password is not MATCH!!'})
        }

        const payload = {
            email,
            name: userExist.name
        }

        jwt.sign(payload, "secret", (err, token) => {
            if (err) console.log(err)
            else {
                return res.json({ token: token })
            }
        })
    }
})

app.listen(PORT, () => {
    console.log(`Auth-Service2 is running at ${PORT}`)
})