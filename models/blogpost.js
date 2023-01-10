const mongoose = require('mongoose')

const blogPost = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'You have to provide a title for your blogpost']
    },
    description: {
        type: String,
        required: [true, 'Provide a short description of the blogpost']
    },
    body:{
        type: String,
        required: [true, 'The body of your post cannot be empty']
    },
    author:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    },
    email: {
        type: String,
        required: [true, 'input your registered email']
    },
    state: {
        type: String,
        state: {
            enum: ['draft', 'published']
        },
        default: 'draft'
    },
    read_count: Number,// find a way to dynamically add the read_count based on the number of times the particular blogpost was opened
    reading_time: {
        type: String
        // default: Date.now()// review this if this is talking about last time the blog was read, or how long was spent on the page
    },
    tags: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
    }
})

// - title is required and unique
// - description
// - author
// - state
// - read_count
// - reading_time
// - tags
// - body is required
// - timestamp

const BlogPost = mongoose.model('BlogPost',blogPost)
module.exports = BlogPost