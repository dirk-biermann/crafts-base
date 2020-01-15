const express = require('express');
const roomController  = express.Router();

const data = { router: "rooms", status: {} };

roomController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
    }
    next();
});                               

roomController.get('/about', (req, res, next) => {
    console.log( "ABOUT ......." );
    data.source = "view";
    data.status.about = true;
    res.render('view/rooms.hbs', data );
});

roomController.get('/', (req, res, next) => {
    data.source = "view";
    delete data.status.about;
    res.render('view/rooms.hbs', data );
});

module.exports = roomController;
