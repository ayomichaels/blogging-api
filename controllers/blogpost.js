const CustomAPIError = require('../errors/custom-error')
const Blogpost = require('../models/blogpost')


const createPost = async (req,res)=>{
    const blogPost = await Blogpost.create(req.body)
    return res.status(201).json({status:'success', msg: 'post created successfully', blogPost})
}
const getAllPosts = async (req,res) =>{
    const {tags, title, author} = req.query

    const queryObject = {}
    //implement queryObject search consult smilga
    let allPosts =   await Blogpost.find({},{_id:0}).select('title')
    //show all post should not show all the details that was passed when creating the blogpost, rather only necessary info should be shown. Use field query. Consult Smilga
    return res.status(200).json({status:'success', nbHits:allPosts.length, allPosts})
}

const getPosts = async (req,res)=>{
    //get posts by name of author
    const {name} = req.query
    console.log(name);
    const queryObject = {}

    // if (name) {
    //     // queryObject.name = {$regex: name, $options: 'm'}
    //     queryObject.name = name

    // }
    
    //using regex for case sensitivity
    try {
        const blogPosts = await Blogpost.find({author : {$regex : name, $options : 'i'}},{_id:0}) //works but you have to write the full name of the author use regex. 

    return res.status(200).json({status:'success', nbHits:blogPosts.length, blogPosts})
    } catch (error) {
        throw new CustomAPIError(`No posts found with author : ${name}`)
    }
    
}

module.exports = {
    getAllPosts,
    createPost,
    getPosts
}