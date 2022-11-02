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
        res.status(201).json({
            msg: 'user created successfully',
            user: user.email,
            status: user.user_type
        })

    } catch (error) {
        throw new CustomAPIError('review your details', 400)
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
    
    //display user's posts (drafts and published) upon login
    const blogPost = await Blogpost.find({email:email},{_id:0})
    res.status(200).json({msg:'welcome user', access_token: token, blogPost, duration: '1hr'})
}


const getAllUsers = async (req,res)=>{
    // const users = await User.find().select('email first_name')
    const users = await User.find().sort('first_name')

    res.status(200).json({nbHits: users.length, users})
}

const getUser = async(req,res)=>{
    const {id:userID} = req.params
    
    const user = await User.findOne({_id:userID})
    if (!user) {
        return res.status(404).json({msg:'user not found'})
    }
    res.status(200).json({status:true, data: user})
    
}


const deleteUser = async(req,res) =>{
    const {id:userId} = req.params

    
    try {
        const user = await User.findOneAndDelete({_id:userId})
        res.status(200).json({msg:'user deleted'})
    } catch (error) {
        throw new CustomAPIError('User not found, check ID and try agian', 404)
        
    }
}

const updateUser = async(req,res) =>{
    const {id:userId} = req.params

    
    try {
        const user = await User.findOneAndUpdate({_id:userId},req.body, {
            new:true,
            runValidators:true
        })
        res.status(200).json({msg:'user details updated'})
    } catch (error) {
        throw new CustomAPIError('User not found, check ID and try agian', 404)
        
    }
}
module.exports = {
    register,
    login,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
    

} 