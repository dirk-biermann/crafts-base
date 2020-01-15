const express = require('express');
const deleteController  = express.Router();

const data = { router: "delete", status: {} };

deleteController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
        next();
    } else {
        data.source = "index";
        res.render("index.hbs", data );
    }                             
});                               

deleteController.get('/about', (req, res, next) => {
    console.log( "ABOUT ......." );
    data.source = "secret/delete";
    data.status.about = true;
    res.render('secret/delete.hbs', data );
});

deleteController.get('/', (req, res, next) => {
    data.source = "secret/delete";
    delete data.status.about;
    res.render('secret/delete.hbs', data );
});

module.exports = deleteController;
