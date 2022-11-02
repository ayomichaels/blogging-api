const express = require('express')
const router = express.Router()
const {adminAccess} = require('../middlewares/auth')

const {register, login, getAllUsers, deleteUser, getUser, updateUser} = require('../controllers/user')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/all-users').get(adminAccess,getAllUsers)
router.route('/:id').delete(deleteUser).get(getUser).patch(updateUser)

module.exports = router