const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var logger = require('morgan');
require('dotenv').config()


mongoose.Promise = require('bluebird');
mongoose.connect(process.env.mongoUrl);
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+ process.env.mongoUrl);
});
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

const app = express();
app.use(logger('dev'));
// CORS Middleware
app.use(cors());
// Body Parser Middleware
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//Routes
const users = require('./routes/users');
const confirmation = require('./routes/confirmation');
app.use('/users', users);
app.use('/confirmation', confirmation);


//Else use angulars folder
app.use(express.static(path.join(__dirname, 'angular-src/dist')));
app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, './angular-src/dist/index.html'));
});


//Your local dev port or for heroku use the env port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
module.exports = app;