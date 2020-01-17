const express = require('express');
const mainController  = express.Router();

let data = { router: "home", status: {} };

mainController.use((req, res, next) => {
    delete data.status.about;

    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
    }
    next();                      
});                               

mainController.get('/about', (req, res, next) => {
    data.source = "/";
    data.status.about = true;
    res.render('index.hbs', data );
});

mainController.get('/', (req, res, next) => {
    data.source = "/about";
    delete data.status.about;
    res.render('index.hbs', data );
});

module.exports = mainController;
