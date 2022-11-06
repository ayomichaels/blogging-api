const express = require('express')
const router = express.Router()
const {authUser} = require('../middlewares/auth')

const {createPost, getAllPosts, getPosts, homePage, updatePost, deletePost} = require('../controllers/blogpost')

router.route('/').get(homePage)
router.route('/create-post').post(authUser, createPost)

router.route('/all-posts').get(authUser,getAllPosts)

router.route('/get-posts').get(getPosts)

router.route('/:id').delete(deletePost).patch(updatePost)

module.exports = router 