const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

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
            res.json({success: true, msg: "You've successfully registered, please check your email to confirm your email address."});
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