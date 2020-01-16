const express = require('express');
const loginController = express.Router();
const User = require('../../models/user');


// BCrypt to encrypt passwords
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;

let data = { router: "login", status: { login: true } };

loginController.get('/about', (req, res, next) => {
    data.source = "/login/";
    data.status.about = true;
    res.render('auth/login.hbs', data );
});

loginController.get('/', (req, res, next) => {
    data.source = "/login/";
    delete data.status.about;
    res.render( 'auth/login.hbs', data );
});

loginController.post("/", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    delete data.status.about;

    if (email === "" || password === "") {
        data.errorMessage = "EMail or password not correct";
        data.source = "/login/";
        res.render("auth/login.hbs", data );
        return;
    }

    User.findOne({"email": email})    
        .then(( user ) => {
            if( user === null ) {
                data.errorMessage = "EMail or password not correct";
                data.source = "/login/";
                res.render("auth/login.hbs", data );
            } else {
                if( ! bcrypt.compareSync(password, user.password) ){
                    data.errorMessage = "EMail or password not correct";
                    data.source = "/login/";
                    res.render("auth/login.hbs", data );
                } else {
                    // Save the login in the session!
                    req.session.currentUser = user;
                    data.status.logged = true;
                    delete data.status.login;
                    data.name = user.fullName;
                    data.source = "/";
                    res.render("index.hbs", data );
                } 
            }
        })
        .catch(error => {
            console.log(error);
        })
});

module.exports = loginController;
