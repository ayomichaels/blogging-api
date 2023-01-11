const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
mongoose.set('debug', true);

const connectDb =  (url)=>{
	console.log('MongoDb connected successfully');
	return mongoose.connect(url, {
		useNewUrlParser: true,
        useUnifiedTopology: true
	})
}

module.exports = {connectDb}