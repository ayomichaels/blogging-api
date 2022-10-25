const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')

const CustomAPIError = require('../errors/custom-error')

const register = async (req,res) =>{
    //create user
    const {email, password} = req.body
    if (!email || !password ) {
        throw new CustomAPIError('please provide all details needed for registration', 400)
    }
    try {
        const user = await User.create(req.body)
        //-- hash password before saving to database 
        res.status(201).json({msg: 'user created successfully'})

    } catch (error) {
        throw new CustomAPIError('please provide all details needed for registration', 400)
    }
    

}

const login = async (req,res)=>{
    const {email, password} = req.body
    
    const user = await User.findOne({email:email})

    if (!user) {
        throw new CustomAPIError('user does not exist, sign up first', 401)
    }
    console.log('this is user' , user.email);

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new CustomAPIError('password incorrect, input correct password',401)
    }
    //create token
    const token = jwt.sign(
        {username:email},
        process.env.ACCESS_TOKEN,
        {expiresIn:'30s'}
    )
    

    
    res.status(200).json({msg:'welcome user', access_token: token, duration: '30 seconds'})
}
module.exports = {
    register,
    login
}