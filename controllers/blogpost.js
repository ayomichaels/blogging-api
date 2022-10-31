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

const getPosts = async (req,res)=>{
    const {search} = req.query
    console.log(search);

    // const blogPosts = await Blogpost.find({})
    // try {
    //     const blogPosts = Blogpost.aggregate(
    //         [ { $match : { author : "Amaju" } } ]
    //     )
    //     return res.status(200).json({status:'success', nbHits:blogPosts.length, blogPosts})
    // } catch (error) {
    //     throw new CustomAPIError(`${author} does not have any blogposts`, 404)
    // }

    const blogPosts = await Blogpost.find({author:search}) // works but you have to write the full name of the author use regex
    return res.status(200).json({status:'success', nbHits:blogPosts.length, blogPosts})
}

module.exports = {
    getAllPosts,
    createPost,
    getPosts
}