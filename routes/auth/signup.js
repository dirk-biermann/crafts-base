const express = require('express');
const signupController = express.Router();
const User = require('../../models/user');

let data = { router: "signup", status: {} };

// BCrypt to encrypt passwords
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;
let isLogin = false;

signupController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
    }
    next();                      
});                               

signupController.get('/', (req, res, next) => {
    data.source = "/signup/";
    res.render( 'auth/signup.hbs', data );
});

signupController.post("/", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "" ) {
        data.errorMessage = "Indicate username and password to sign up";
        data.source = "/signup/";
        res.render("auth/signup.hbs", data );
        return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.findOne({"username": username})    
        .then(( user ) => {
            if( user !== null ) {
                data.errorMessage = "Entered username already exist";
                data.source = "/signup/";
                res.render("auth/signup.hbs", data, );
                return;
            }
            User.create({
                username,
                password: hashPass
            })
            .then(() => {
                res.redirect("/");
            })
        })
        .catch(error => {
            console.log(error);
        })
});

module.exports = signupController;