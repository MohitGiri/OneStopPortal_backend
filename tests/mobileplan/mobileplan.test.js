const Card  = require("../../models/paymentcards")
const User = require("../../models/user")
const Plan = require("../../models/planMessage")
const Post = require("../../models/postMessage")
const app = require("../../index")
const mongoose = require("mongoose");
const supertest = require("supertest");


beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/JestMobiPlanTestDB",
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

  describe('admin mobile test', () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMTU1NjA2MzY1NDkyNzg0MTEyOTEiLCJpYXQiOjE2MzAzMTk1MzN9.DWAfipzBUOLzO9IssEQw9WDkxB3fOBPWtcIyaIIL0Kk";
    test("POST /api/plan/create/:postid/:cardId/:userId", async()=>{
        const user =  await User.create({ 
            _id: "115560636549278411291", 
            name : "mayur",
            lastname : "patil",
            email : "mayurpatil@gmail.com",
            googleId : "115560636549278411291",
            role:1
          });

        const post = await Post.create({
            plan : 199,
            validity : 28,
            data : 50,
            sms : 100,
            cost : 199
          })
        const card = await Card.create({
            userId :"115560636549278411291",
            cardtype : "Credit",
            cardnumber : 123456789122,
            expirydate : "05/21"
            });
        const body = {
            cvv :  123
        }
        await supertest(app)
        .post("/api/plan/create/" + post._id +"/"+card._id+"/"+user._id) 
        .set('Authorization',"Bearer "+ token)
        .set('Accept', 'application/json')
        .send(body)
        .expect(200)
        .then(async (response) => {
            expect(response.body._id).toBeTruthy();
            expect(response.body.plan).toBe(post.plan)
        })

    })

    test("POST /api/plan/user/:userId", async()=>{
      const user =  await User.create({ 
          _id: "115560636549278411291", 
          name : "mayur",
          lastname : "patil",
          email : "mayurpatil@gmail.com",
          googleId : "115560636549278411291",
          role:1
        });
      
      const plan = await Plan.create({
        plan_schema : "612b813e0cc9fa8cb0f416f7",
        user : user._id,
        plan : 144,
        validity : 28,
        data : 133,
        SMS : 100,
        cost : 122,
        transaction_id : "abcd"
      })
      await supertest(app)
      .get("/api/plan/user/"+user._id) 
      .set('Authorization',"Bearer "+ token)
      .set('Accept', 'application/json')
      .expect(200)
      .then(async (response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
      })
    })

})
