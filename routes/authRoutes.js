const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');



// Get register page
router.get('/register', (req, res) => {
    try{
    res.render('signup');
    }
    catch(e){

    }
});

// router.get('/fakeUser', async (req, res) => {
//     const user = new User({ username: 'max', email: 'max@gmail.com' });
//     const newUser = await User.register(user, '12345');
//     res.send(newUser);
// });


// Register new user
router.post('/register', async(req, res) => {
    try{
        const { username, password, email } = req.body;
        const user = new User({ username, email });
        await User.register(user, password);
        req.flash('success', 'Registered Successfully');
        res.redirect('/login');
    }
    catch (e) {
        console.log(e);   
    }
});

router.get('/login', (req, res) => {
    try{
    res.render('login');
    }
    catch(e){
        
    }
});


// Login user into the session
router.post('/login',
    passport.authenticate('local',
        { 
            failureRedirect: '/login',
            failureMessage: true,
            failureFlash: true 
        }),
  function(req, res) {
    req.flash('success',`Welcome back again ${req.user.username}`)
    res.redirect('/');
});


router.get('/logout', (req, res) => {
    try {
        let username=req.user.username
        req.logout((err)=> {
            if (err) { return next(err); }
            req.flash('success', `GoodBye!  ${username}`);
            res.redirect('/login');
        });
    }
    catch (e) {
        req.flash('error', 'something went wrong');
        res.redirect('/');
    }
})

module.exports = router;