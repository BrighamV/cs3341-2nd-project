const express = require('express')
const router = require('express').Router();
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// auth login
router.get('/login',(req, res) => {
    res.render('login');
});


// auth with google
router.get('/google', ensureGuest, passport.authenticate('google', { scope: ['profile']}), (req, res) => {
    res.send("send it")
});

// auth with google callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}),
 (req, res) => {
     res.redirect('http://localhost:4200/')
 });

// auth logout
// router.get('/logout', (req, res) => {
//     //handle with passport
//     // res.send('logging out')
//     req.logout()
//     res.redirect('http://localhost:4200/')
// })


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('http://localhost:4200/');
    });
  });

module.exports = router;