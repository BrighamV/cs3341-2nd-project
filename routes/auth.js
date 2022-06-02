const express = require('express')
const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login',(req, res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    res.send('logging out')
})

// auth with google
router.get('/google', passport.authenticate('google', { scope: ['profile']}));

// auth with google callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}),
 (req, res) => {
     res.redirect('/search')
 });


module.exports = router;