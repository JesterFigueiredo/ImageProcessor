const express = require('express');
require('dotenv').config();
const {router} = require('./routes')
const mongoose  = require('mongoose')
// const bodyParser =  require('body-parser')
const app = express();
const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'You have exceeded the limit of 5 calls per minute, make a request later',
});

app.use(limiter);

app.use(express.json());
app.use('/api',router);

mongoose.connect(process.env.DATABASE_URI)
.then(()=>{console.log("successfully connected to database")})
.catch((err)=>{console.log("error while connecting to the database")})

app.listen(process.env.PORT,()=>{
    console.log("Server started at port: ",process.env.PORT);
})