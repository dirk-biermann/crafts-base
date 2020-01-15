const express = require('express');
const mainController  = express.Router();

let data = { router: "home", status: {} };

mainController.use((req, res, next) => {
    delete data.status.about;

    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
    }
    console.log( "USER-CHECK", JSON.stringify( data ) );
    next();                      
});                               

mainController.get('/about', (req, res, next) => {
    data.source = "";
    data.status.about = true;
    console.log( "ABOUT", JSON.stringify( data ) );
    res.render('index.hbs', data );
});

mainController.get('/', (req, res, next) => {
    data.source = "";
    delete data.status.about;
    console.log( "NORM", JSON.stringify( data ) );
    res.render('index.hbs', data );
});

module.exports = mainController;
