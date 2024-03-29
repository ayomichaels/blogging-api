const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const Blogpost = require('../models/blogpost')
const CustomAPIError = require('../errors/custom-error')
const logger = require('../logger/logger')


const register = async (req,res) =>{
    //create user
    const {email, password} = req.body
    if (!email || !password ) {
        return res.status(400).json({msg: 'fill the required fills to register'})
        throw new CustomAPIError('please provide all details needed for registration', 400)
        
    }

    const user = await User.create(req.body)
    if (!user) {
        return res.status(400).json({msg: 'registration unsuccessful, review details and try again'})
    }

    logger.info('new user registration successful')

    res.status(201).json({
        msg: "user created successfully", 
        user: user.email,
        status: user.user_type
    })
    // try {
    //     const user = await User.create(req.body)
    //     //-- hash password before saving to database 
    //     return res.status(201).json({
    //         msg: 'user created successfully',
    //         user: user.email,
    //         status: user.user_type
    //     })

    // } catch (error) {
    //     throw new CustomAPIError('review your details', 400)
    // }
    

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

    logger.info('user loged in successfully')

    //create token
    const token = jwt.sign(
        {username:email},
        process.env.ACCESS_TOKEN,
        {expiresIn:'1h'}
    )

    console.log(`this is token ${token}`);
    
    //display user's posts (drafts and published) upon login
    
    //get user's blogposts using their ID
    const yourBlogposts = await Blogpost.find({email:email})
    const allBlogposts = await Blogpost.find({},{_id:0})
    res.status(200).json({msg:`welcome ${user.first_name}, your access token will last for 1hr`, access_token: token, totalNumOfYourPosts: yourBlogposts.length, yourBlogposts, numberOfTotalPosts:allBlogposts.length, allBlogposts})
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