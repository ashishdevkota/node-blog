const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const blogRoutes=require('./routes/blogRoutes');
const { render } = require('ejs');

// express app
const app= express();

//connect to mongodb
const dbURI='mongodb+srv://netmkct:test1234@cluster0.ucnxo.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
 .then((result)=>app.listen(3000))
 .catch((err)=>console.log(err));

//register view engine
app.set('view engine','ejs');
app.set('views','views');

//middleware & static file
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
//use morgan
app.use(morgan('dev'));

//routes
app.get('/',(req,res)=>{
      res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    // res.send('<p>About Page</p>');
res.render('about',{title:'About'});    
});

//blog route0
app.use('/blogs',blogRoutes)


//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about',{title:'About'});
});

//404 page
app.use((req,res)=>{
res.status(404).render('404',{title:'404'}); 
})