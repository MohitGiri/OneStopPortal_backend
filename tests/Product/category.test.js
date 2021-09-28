const Product = require("../../models/product")
const Category = require("../../models/category")
const User = require("../../models/user")
const app = require("../../index")
const mongoose = require("mongoose");
const supertest = require("supertest");


beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/JestCateDB",
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false
    },() => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });

describe('admin product test', () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMTU1NjA2MzY1NDkyNzg0MTEyOTEiLCJpYXQiOjE2MzAzMTk1MzN9.DWAfipzBUOLzO9IssEQw9WDkxB3fOBPWtcIyaIIL0Kk";

    ///////////////////////Testing Create Category////////////////////////
    test("POST /api/category/create/:userId", async () => {
    const user =  await User.create({ 
          _id: "115560636549278411291", 
          name : "mg",
          lastname : "ji",
          email : "mgji391@gmail.com",
          googleId : "115560636549278411291",
          role:1
        });
        const data = { name : "Mobiles" };
        //const header = {'Authorization': `Bearer `+ token, 'Content-Type': 'application/json'};
      
        await supertest(app)
          .post("/api/category/create/" + "115560636549278411291") 
          // .set('Content-Type','application/json') 
          .set('Authorization',"Bearer "+ token)
          .set('Accept', 'application/json')
          .send(data)
          .expect(200)
          .then(async (response) => {
              /////////////////Check For Category///////////////////////
            // Check the response
            expect(response.body.category._id).toBeTruthy();
            expect(response.body.category.name).toBe(data.name);
      
            // Check data in the database
            const post = await Category.findOne({ _id: response.body.category._id });
            expect(post).toBeTruthy();
            expect(post.name).toBe(data.name);
            /////////////////Check For Category End///////////////////////

          })
    })
    test("GET /api/categories", async () => {
        const user =  await User.create({ 
            _id: "115560636549278411291", 
            name : "mg",
            lastname : "ji",
            email : "mgji391@gmail.com",
            googleId : "115560636549278411291",
            role:1
        })
        const category = await Category.create({
            name : "Mobiles" 
        })
        await supertest(app)
          .get("/api/categories") 
          // .set('Content-Type','application/json') 
          .set('Authorization',"Bearer "+ token)
          .set('Accept', 'application/json')
          .expect(200)
          .then(async (response) => {
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);
          })
    })
    
    test("PUT /api/category/:categoryId/:userId", async () => {
        const user =  await User.create({ 
              _id: "115560636549278411291", 
              name : "mg",
              lastname : "ji",
              email : "mgji391@gmail.com",
              googleId : "115560636549278411291",
              role:1
            });
            const category = await Category.create({
                name : "Mobiles" 
            })
            const body ={
                name : "Broadband"
            }
            await supertest(app)
              .put("/api/category/" + category._id +"/" +user._id) 
              // .set('Content-Type','application/json') 
              .set('Authorization',"Bearer "+ token)
              .set('Accept', 'application/json')
              .send(body)
              .expect(200)
              .then(async (response) => {
                expect(response.body.name).toBe(body.name);
              })
        })
        test("DELETE /api/category/:categoryId/:userId", async () => {
            const user =  await User.create({ 
                  _id: "115560636549278411291", 
                  name : "mg",
                  lastname : "ji",
                  email : "mgji391@gmail.com",
                  googleId : "115560636549278411291",
                  role:1
                });
                const category = await Category.create({
                    name : "Mobiles" 
                })
                await supertest(app)
                  .delete("/api/category/" + category._id +"/" +user._id) 
                  // .set('Content-Type','application/json') 
                  .set('Authorization',"Bearer "+ token)
                  .set('Accept', 'application/json')
                  .expect(200)
                  .then(async (response) => {
                    expect(await Category.findOne({ _id: category._id })).toBeFalsy();
                  })
            })
    })