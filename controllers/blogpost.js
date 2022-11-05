const CustomAPIError = require('../errors/custom-error')
const Blogpost = require('../models/blogpost')


const homePage = async (req,res)=>{
    let allPosts =   await Blogpost.find({},{_id:0}).select('title')
    return res.status(200).json({status:'success', nbHits:allPosts.length, allPosts})
}

//function to count the number of words in a string
function wordCount(str) { 
    return str.split(" ").length;
}

const createPost = async (req,res)=>{
    const body = req.body
    const postBodyCount = wordCount(body.body)
    console.log(postBodyCount);
    let reading_time;
    if (postBodyCount < 200){
        reading_time = 'less than 1 min'
    } else if (postBodyCount > 200 && postBodyCount <=250) {
        reading_time = 'less than 2 mins'
    }

    else {
        reading_time = 'less than 4 mins'
    }
    // reading_time = (postBodyCount * 3) + 's'

    // let {reading_time, body} = req.body
    // reading_time = body.length * 3 +'s'

    ///////
    const blogPost = await Blogpost.create({
        title: body.title,
        description: body.description,
        body: body.body,
        author: body.author,
        email: body.email,
        state: body.state,
        reading_time: reading_time,
        tags: body.tags,
        createdAt: Date.now(),
        updatedAt: Date.now()





    })
    return res.status(201).json({status:'success', msg: 'post created successfully', blogPost})
}
const getAllPosts = async (req,res) =>{
    const {tags, title, author, state} = req.query

    const queryObject = {}
    if (state) {
        queryObject.state = state
    }

    if (tags) {
        queryObject.tags = tags
    }

    if (title) {
        queryObject.title = title
    }

    if (author) {
        queryObject.author = author
    }
    //implement queryObject search consult smilga
    // let allPosts =   await Blogpost.find({},{_id:0}).select('title')

    const allPosts = await Blogpost.find(queryObject, {_id:0})
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
    homePage,
    getAllPosts,
    createPost,
    getPosts
}