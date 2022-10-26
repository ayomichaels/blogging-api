// const supertest = require('supertest')

// let server = require('../index')

//test('description', function) for JEST

// test('register a user after providing all details', ()=>{
//     expect(app())
// })



// describe('Register Route', ()=>{
    
//     describe('given a an email and password', ()=>{
//         test('should respond with a 201 status code', async ()=>{
//             const response = await supertest(app).post('register').send({
//                 email: 'email',
//                 password: 'password'
//             })
//             expect(response.statusCode).toBe(201)
//         })
//     })
// })


const supertest = require('supertest')

let server = require('../index')

require('jest')
jest.setTimeout(30000)

describe('User Route', ()=>{

    it ('POST /register works', async ()=>{
        const response = await supertest(server).post('/register')
        expect(response.status).toBe(201)
    })

    // it ('GET /homepage works', async ()=>{
    //     const response = await supertest(server).get('/')
    //     console.log(response);
    //     expect(response.status).toBe(200)
    // } )

    
})