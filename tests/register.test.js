
const {connectDb} = require('../database/connect')

const supertest = require('supertest')

let app = require('../app-test')

const User = require('../models/user')

require('jest')
jest.setTimeout(30000)


//separate test file from production file. Test file should not connect to Database so remove the database connect from that
describe('User Route', ()=>{
    // let connection;
    // let token

    // //for this to pass you have to pass the parameters that is needed to register
    // beforeAll(async ()=>{
    //     connection = await connectDb(process.env.MONGO_URI)

    //     await User.create({
    //         email: "lade@gmail.com",
    //         first_name: "Pero",
    //         last_name: "Oluwapelumi",
    //         password: "thtitot040404jr",
    //         user_type: "user"
    //     })
    
    // })



    // it ('POST /register works', async ()=>{
    //     const response = await supertest(app).post('/register').send({
    //         email: "bolade@gmail.com",
    //         first_name: "Pero",
    //         last_name: "Oluwapelumi",
    //         password: "thtitot040404jr",
    //         user_type: "user"
    //     })
    //     .expect(response.status).toBe(201)
    // })

    //this passed
    it ('GET /homepage works', async ()=>{
        const response = await supertest(app).get('/')
        console.log(response.body);
        expect(response.status).toBe(200)
    } )

    
})