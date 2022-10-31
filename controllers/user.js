const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const Blogpost = require('../models/blogpost')
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
        {expiresIn:'1h'}
    )
    
     
    //display user's post (drafts and published) upon login
    const blogPost = await Blogpost.find({email:email})
    res.status(200).json({msg:'welcome user', access_token: token, blogPost, duration: '1hr'})
}


const getAllUsers = async (req,res)=>{
    // const users = await User.find().select('email first_name')
    const users = await User.find().sort('-first_name').limit(3)

    res.status(200).json({nbHits: users.length, users})
}
module.exports = {
    register,
    login,
    getAllUsers
}