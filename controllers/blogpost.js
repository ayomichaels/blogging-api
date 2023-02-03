const CustomAPIError = require('../errors/custom-error')
const Blogpost = require('../models/blogpost')

const {userAccess} = require('../middlewares/auth')

const logger = require('../logger/logger')

const homePage = async (req,res)=>{
    logger.info('homepage was requested')
    const {tags, title, author, state, page=1, limit=10} = req.query

    //to render server-side and make the structure be easy, the id will be displayed cause it will be needed to require the post upon clicking

    let allPosts =   await Blogpost.find().sort({createdAt: 'desc'}).limit(limit).skip((page-1)*limit)

     // hide the author's id and the post id because the id is needed to update/delete the post.
    // Can i optimize this such that to update/delete any post the jwt will be decoded and the email must match the email of the user that wants to access the post to make changes
    // let allPosts =   await Blogpost.find({},{_id:0, author: 0}).sort({createdAt: 'desc'}) 

   

    //rendering with ejs
    res.render('articles/index', {articles: allPosts})
    // res.render('index')


    // return res.status(200).json({status:'success', nbHits:allPosts.length, allPosts})
}

//function to count the number of words in a string
function wordCount(str) { 
    return str.split(" ").length;
}

const createPost = async (req,res)=>{
    const body = req.body

    //uncomment from here
    // const postBodyCount = wordCount(body.body)
    // console.log(postBodyCount);
    // let reading_time;
    // if (postBodyCount < 200){
    //     reading_time = 'less than 1 min'
    // } else if (postBodyCount > 200 && postBodyCount <=250) {
    //     reading_time = 'less than 2 mins'
    // }

    // else {
    //     reading_time = 'less than 4 mins'
    // }
    // reading_time = (postBodyCount * 3) + 's'


    ///////
    // const blogPost = await Blogpost.create({
    //     title: body.title,
    //     description: body.description,
    //     body: body.body,
    //     author: body.author,
    //     email: body.email,
    //     state: body.state,
    //     reading_time: reading_time,
    //     tags: body.tags,
    //     createdAt: Date.now(),
    //     updatedAt: Date.now()





    // })

    //my update
    const blogPost = await Blogpost.create(req.body)
    // blogPost.reading_time = reading_time
    try {
        // await blogPost.save()
        // const blogPost = await Blogpost.create(req.body)

        logger.info('new post created')
        console.log(blogPost);

        res.redirect(`/blog/${blogPost.slug}`)// redirects to a page showing the new post and also increments the views of the post, disable the increment functionality later.
    } catch (error) {
        console.log(error);
    }

    //rendering with ejs
    // res.render('articles/new')
    // return res.status(201).json({status:'success', msg: 'post created successfully', blogPost})
}

//get all posts
const getAllPosts = async (req,res) =>{
    logger.info('all posts was requested')
    const {tags, title, author, state, page=1, limit=10} = req.query

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

    const allPosts = await Blogpost.find(queryObject, {_id:0}).limit(limit).skip((page-1)*limit)

    //using regex
    // const allPosts = await Blogpost.aggregate([
    //     {$match : {title: new RegExp(title,'i')}}
    // ])

    // const allPosts = await Blogpost.find()
    //show all post should not show all the details that was passed when creating the blogpost, rather only necessary info should be shown. Use field query. Consult Smilga
    return res.status(200).json({status:'success', nbHits:allPosts.length, allPosts})
}


const getPost = async (req,res)=>{
    //using id
    // logger.info('a post was requested with an ID')
    // const {id:blogID} = req.params
    // console.log(`This is the ID of the post : ${blogID}`);

    // const blogPost = await Blogpost.findById(blogID)

    //using slug
    const {slug:blogSlug} = req.params
    console.log(req.params);
    console.log(`This is the slug of the post : ${blogSlug}`)

    const blogPost = await Blogpost.findOne({slug: blogSlug})

    

    // if (!blogPost) {return res.status(400).send('NO POST WITH THIS ID, INPUT CORRECT ID')}

    if (!blogPost) { 
        alert('no blogpost found with ID')
        res.redirect('/')

    }

    blogPost.views+=1
    await blogPost.save()

    //rendering with ejs
    res.render('articles/show', {article:blogPost})
    // return res.status(200).json(blogPost)
}


//this is to get posts using request query
const getPosts = async (req,res)=>{
    //get posts by name of author
    const {name} = req.query
    const {blogID} = req.params
    console.log(name);
    const queryObject = {}

    // if (name) {
    //     // queryObject.name = {$regex: name, $options: 'm'}
    //     queryObject.name = name

    // }
    

    //STARTS HERE: See if you need anything here
    //using regex for case sensitivity
    try {
        const blogPosts = await Blogpost.find({author : {$regex : name, $options : 'i'}},{_id:0}) //works but you have to write the full name of the author use regex. 

    return res.status(200).json({status:'success', nbHits:blogPosts.length, blogPosts})
    } catch (error) {
        throw new CustomAPIError(`No posts found with author : ${name}`)
    }

    
    
}



const deletePost = async (req,res)=>{
    logger.info('post was deleted')
    const {id:postID} = req.params

    try {
        const post = await Blogpost.findOneAndDelete({_id:postID})
        res.status(200).json({msg:'post deleted'})
    } catch (error) {
        throw new Error('input correct post ID', 404)
    }
}


const updatePost = async (req,res)=>{
    logger.info('post updated')
    const {id:postID} = req.params
    const blogPost = await Blogpost.findById(postID)
    console.log(blogPost.email);

    //ensure that only the author of the blog is allowed to make changes to the blog
    console.log('below this line is userAccess');
    const user = await userAccess(req,res);// in this function only the user's email is returned
    console.log('below this line is the user');
    console.log(user);
    
    if (blogPost.email!=user) {
        return res.status(404).send('You are not the author if this blog, you cannot make any changes to the blog')
    }
    try {
        const post = await Blogpost.findOneAndUpdate({_id:postID}, req.body, {
            new: true,
            runValidators:true
        })
        post.updatedAt = Date.now()
        await post.save()
        res.status(200).json({msg:'post updated', post})
    } catch (error) {
        throw new Error('input correct post ID', 404)
    }
}

module.exports = {
    homePage,
    getAllPosts,
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost
}