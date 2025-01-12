const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { validationResult, body } = require('express-validator')
const usersCltr = {}


 
usersCltr.register = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const body = req.body 
    try { 
        const salt = await bcryptjs.genSalt() // To make each password unique 29 characters.
        const hashPassword = await bcryptjs.hash(body.password, salt) // For secruity purposes, plain password with salt.
        const user = new User(body) // assign the user
        user.password = hashPassword // convert password to hashed password.
        await user.save() 
        res.status(201).json(user) 
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
}


usersCltr.login = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {username, password} = req.body
    try {
       const user = await User.findOne({username})
       if(user) { //checking if the user is present or no in db
        const isAuth = await bcryptjs.compare(password, user.password) //comparing password with db password, plain password with hashed password.
        if(isAuth) {
            const tokenData = {
                id: user._id // generate a token with the values 
            }
            const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d'})
            return res.json({ token: token })
        }
        return res.status(404).json({ errors: 'invalid email / password '}) // send it to frontend.
    }
    res.status(404).json({ errors: 'invalid email / password'})
} catch(err) {
    res.status(500).json({ message: 'something went wrong' });
}
}



usersCltr.account = async (req, res) => {  // finding the user through token+
    try{
        const user =  await User.findById(req.user.id)
        res.json(user)
    } catch(err) {
        res.status(500).json({ error: 'something went wrong'})
    }
}
module.exports = usersCltr