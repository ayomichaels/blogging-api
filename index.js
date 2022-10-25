const express = require('express')
const {connectDb} = require('./database/connect')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req,res)=>{
    res.status(200).json({msg:'homepage working'})
})

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