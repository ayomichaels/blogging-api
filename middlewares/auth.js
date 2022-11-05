const User = require('../models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const CustomAPIError = require('../errors/custom-error')

const authUser = (req,res,next)=>{
    //upon LOGIN check for token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).send('invalid token, provide correct token')
        throw new CustomAPIError('invalid token', 401)
        
        
    }
    //extract token from header
    const token = authHeader.split(' ')[1]
    //verify token
    //
    const decode = jwt.verify(token,process.env.ACCESS_TOKEN)
    // console.log(decode);
    // const expired = decode.exp
    // console.log(`The token will expire at ${expired}`);
    if (!decode) {
        return res.status(401).json({msg:'unauthorized, token invalid'})
    }

    next()
}


const adminAccess = async (req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email:email})
    if (!user){
        throw new CustomAPIError('User not found, kindly register',404) 
    }
    if (user.user_type==='user'){
        return res.status(401).json({msg:'unathorized access'})
    }

    next()
}
module.exports = {
    authUser,
    adminAccess
}