if(process.env.NODE_ENV!='production'){
require('dotenv').config()
}

const express =require('express')
const app=express();
const path=require('path')
const mongoose=require('mongoose')
const methodOverride=require('method-override')
const imageRoutes=require('./routes/imageRoutes')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy=require('passport-local');
const flash=require('connect-flash')
const authRoutes=require('./routes/authRoutes')
const User=require('./model/user')
const MongoStore = require('connect-mongo');


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/memory-maker'

mongoose.connect(dbUrl)
    .then(() => console.log("DB CONNECTED!"))
    .catch((err) => console.log(err));



  app.use(methodOverride('_method'))


  const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 60 * 60 * 24 * 1
  })
  

  const secret = process.env.SECRET || 'weneedabettersecret';

  const sessionConfig = {
  store,
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7 * 1,
    maxAge:1000 * 60 * 60 * 24 * 7 * 1
  }
}
  
  
  app.use(session(sessionConfig));
  app.use(flash())

  //passport use session 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  


app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
 
  next();
});








app.use(imageRoutes)
app.use(authRoutes)











const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server started at 3000")
})