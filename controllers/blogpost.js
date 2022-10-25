const Blogpost = require('../models/blogpost')


const createPost = async (req,res)=>{
    const blogPost = await Blogpost.create(req.body)
    return res.status(201).json({status:'success', msg: 'post created successfully', blogPost})
}
const getAllPosts = async (req,res) =>{
    const allPosts = await Blogpost.find()
    //show all post should not show all the details that was passed when creating the blogpost, rather only necessary info should be shown. Use field query. Consult Smilga
    return res.status(200).json({status:'success', nbHits:allPosts.length, allPosts})
}

module.exports = {
    getAllPosts,
    createPost
}