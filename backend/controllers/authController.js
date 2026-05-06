const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

const register = async(req, res) => {
    const {name, email, password} = req.body
    const user = await User.findOne({email})
    if(user){
        return res.json({
            message: "User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    res.json(newUser)
}

const login = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.json({
            message: "User not found"
        })
    }
    const isMatch = await bcrypt.compare(
        password,
        user.password
    )
    if(!isMatch){
        return res.json({
            message: "Wrong password"
        })
    }
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET
    )
    res.json({token})
}

module.exports = {
    register,
    login
}