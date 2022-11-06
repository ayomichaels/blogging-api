const mongoose = require('mongoose')

const supertest = require('supertest')

const app = require('../app-test')

const User = require('../models/user')

require('dotenv').config()

require('jest')
// jest.setTimeout(30000)

beforeEach( async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
})

//separate test file from production file. Test file should not connect to Database so remove the database connect from that

describe ('GET/blog', ()=>{
    it ('should return the homepage showing a list of blogs', async ()=>{
        
        const response = await supertest(app).get('/blog')
        // console.log(response.body);
        expect(response.status).toBe(200)
        expect(response.body.status).toBe('success')
        
    })
})
    
describe('User Route', ()=>{
    it ('it should register a new user', async ()=>{
        const newUser = {
            email: "alaoakala@gmail.com",
            first_name: "Alao",
            last_name: "Akala",
            password: "thtitot040404jr",
            user_type: "user"
        }
        const response = await supertest(app).post('/users/register').send(newUser)
        .expect(response.status).toBe(201)
        console.log(response);
        // const response = await supertest(app)
        // console.log(response.body);
    })


    //this passed
    

    
    
})


describe("GET /blog without token", () => {
    it("should return an error text", async () => {
        const response = await supertest(app).get("/blog/all-posts");
        expect(response.text).toBe('invalid token, provide correct token');

    });
});





afterAll(()=>{
    mongoose.connection.close()
})