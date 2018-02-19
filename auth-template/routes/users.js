const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Token = require('../models/verificationToken')
var crypto = require('crypto');
var nodemailer = require('nodemailer');

// Register
router.post('/register',  (req, res, next) => {

    let newUser = new User ({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
  
    User.findOne({email:newUser.email}).then(user=>{
      if(user){
        res.json({success: false, msg: `An Account with email:  ${newUser.email} already exists`});
      }else{
        User.addUser(newUser, (err, user) => {
          if(err) {
            res.json({success: false, msg: 'Failed to register user'});
          } else {
            // Create a verification token for this user
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            // Save the verification token
            token.save( err=>{
              if(err){
                res.json({success: false, msg: `Encountered and Unknown error: ${err}`});
              }
                          // Send the email
            var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.userEmail, pass: process.env.userPass } });
            var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.json({success: true, msg: "You've successfully registered, please check your email to confirm your email address."});
            });
            })
          }
        })
      }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }
    if(user.isVerified == false){
      return res.json({success: false, msg: 'Email is not Verified'})
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
