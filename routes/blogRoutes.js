const express = require('express')
const router = express.Router()
const {authUser} = require('../middlewares/auth')

const {createPost, getAllPosts, getPosts} = require('../controllers/blogpost')

router.route('/create-post').post(authUser, createPost)

router.route('/all-posts').get(authUser,getAllPosts)

router.route('/get-posts').get(getPosts)

module.exports = router 