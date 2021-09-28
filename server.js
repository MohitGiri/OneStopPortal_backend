const app = require("./index")
const mongoose = require('mongoose');

//'mongodb://localhost:27017/cstestDB'
mongoose.connect('mongodb+srv://AnushaMadan:Madan1204@cluster0.k0byf.mongodb.net/TrainingProject?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log("DATABASE CONNECTED");
        app.listen(8000,()=>{
            console.log("Server started")
        })
    })
    .catch((err)=>{
        console.log(err)
        console.log("Database Connection failed")
    })