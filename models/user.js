const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')



const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password : {
        type: String,
        required: [true, 'password is required'],
        unique: true
    },
    user_type:  { 
        type: String, 
        required: true, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }
})

userModel.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

  // You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
userModel.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}


module.exports = mongoose.model('Users', userModel)