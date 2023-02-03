const express = require('express')
const app = express()

const {connectDb} = require('./database/connect')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

const winston = require('express-winston')
const logger = require('./logger/logger')
const port = process.env.PORT || 3000
const {homePage} = require('./controllers/blogpost')



//logger
// app.use(winston.logger({
//     winstonInstance: logger,
//     statusLevels: true
// }))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.get('/', homePage)

app.use('/users',userRoutes)
app.use('/blog',blogRoutes)

// connectDb(process.env.MONGO_URI)

// app.listen(port, ()=>{
//     console.log(`server is listening on port : ${port}`);
// })

const start = ()=>{
    try {
        connectDb(process.env.MONGO_URI)
    app.listen(port, ()=>{
        console.log(`server is listening on port : ${port}`);
    })
    } catch (error) {
        console.log(error);
    }
}

start()

module.exports = app