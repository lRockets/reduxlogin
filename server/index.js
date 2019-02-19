import express from 'express';
import users from './routes/users';
import auth from './routes/auth';
import article from './routes/article';
import bodyParser from 'body-parser';


const mongoose=require('mongoose');
const dbUrl="mongodb://127.0.0.1:27017/reduxlogin"; 
mongoose.connect(dbUrl, { useNewUrlParser: true });


const app=express();

app.use(bodyParser.json());
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/article',article);


app.get('/',function(req,res){
    res.send('hello');
})

app.listen(6060,()=>console.log('running on localhost:6060'))