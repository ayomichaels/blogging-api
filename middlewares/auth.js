const User = require('../models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const CustomAPIError = require('../errors/custom-error')

const authUser = (req,res,next)=>{
    //upon LOGIN check for token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).send('invalid token')
        throw new CustomAPIError('invalid token', 401)
        
        
    }
    //extract token from header
    const token = authHeader.split(' ')[1]
    console.log(token);
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

module.exports = authUser