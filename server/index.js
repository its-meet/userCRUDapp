const express = require('express')
const app = express()
const port = 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute')
dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then((console.log('Connected to mongoDB')))
.catch((error)=>console.log(error))


app.use('/api/auth',  authRoute);
app.use('/api/user',  userRoute);

app.get('/',(req,res)=>{
    res.send('Hi bitch')
})
app.get('/meet',(req,res)=>{
    res.send('Hi meet')
})

app.listen(port, ()=>{console.log(`Server is listen at port ${port}`)})
