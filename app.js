const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');

//reference new custom controller
const employersRouter = require('./controllers/employers');
const citiesRouter = require('./controllers/cities');
const authRouter = require('./controllers/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//use dotenv to read .env file with config vars 
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

//mongoDB connection using mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)
  .then((res) => {
    console.log('Connected to MongoDB');
  })
  .catch(() => {
    console.log('Connection to MongoDB failed.')
  });

// passport auth config
const passport = require('passport');
const session = require('express-session');

app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
passport.use(User.createStrategy());

//read / write session vars
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// google auth strategy for passport
const googleStrategy = require('passport-google-oauth20').Strategy;
//1. auth with google app with api keys
//2. check if we already have this user with this google id in the users collection
//3. if user not found, create a new google user in our users collection
passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ oauthId: profile.id }, {
    username: profile.displayName,
    oauthProvider: "Google"
  }, (err, user) => {
    return done(err, user);
  })
}));

// map requests
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employers', employersRouter);
app.use('/cities', citiesRouter);
app.use('/auth', authRouter);

// add hbs extenstion function to select the correct dropdown optio when editing
const hbs = require('hbs');
const { initialize } = require('passport');
hbs.registerHelper('selectOption', (currentValue, selectedValue) => {
  let selectedProperty = '';
  if (currentValue == selectedValue) {
    selectedProperty = ' selected';
  }
  return new hbs.SafeString(`<option${selectedProperty}>${currentValue}</option>`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
