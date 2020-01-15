const express = require('express');
const editController  = express.Router();

const data = { router: "edit", status: {} };

editController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
        next();
    } else {
        data.source = "index";
        res.render("index.hbs", data );
    }                             
});                               

editController.get('/about', (req, res, next) => {
    console.log( "ABOUT ......." );
    data.source = "secret/edit";
    data.status.about = true;
    res.render('secret/edit.hbs', data );
});

editController.get('/', (req, res, next) => {
    data.source = "secret/edit";
    delete data.status.about;
    res.render('secret/edit.hbs', data );
});

module.exports = editController;
