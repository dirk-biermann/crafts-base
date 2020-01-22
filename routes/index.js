const express = require('express');
const mainController  = express.Router();

let data = { router: "home", status: {} };

mainController.use((req, res, next) => {
    delete data.status.about;

    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
    } else {
        delete data.status.logged;
        delete data.name;
    }
    next();                      
});                               

mainController.get('/', (req, res, next) => {
    data.source = "/";
    res.render('index.hbs', data );
});

module.exports = mainController;
