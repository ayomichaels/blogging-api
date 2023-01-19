const express = require('express')
const {connectDb} = require('./database/connect')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

const {homePage} = require('./controllers/blogpost')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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