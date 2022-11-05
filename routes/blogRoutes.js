const express = require('express')
const router = express.Router()
const {authUser} = require('../middlewares/auth')

const {createPost, getAllPosts, getPosts, homePage} = require('../controllers/blogpost')

router.route('/').get(homePage)
router.route('/create-post').post(authUser, createPost)

router.route('/all-posts').get(authUser,getAllPosts)

router.route('/get-posts').get(getPosts)

module.exports = router 