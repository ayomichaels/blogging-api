const mongoose = require('mongoose')

const connectDb =  (url)=>{
	console.log('MongoDb connected successfully');
	return mongoose.connect(url, {
		useNewUrlParser: true,
        useUnifiedTopology: true
	})
}

module.exports = {connectDb}