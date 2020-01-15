const express = require('express');
const createController  = express.Router();

const data = { router: "create", status: {} };

createController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
        next();
    } else {
        data.source = "index";
        res.render("index.hbs", data );
    }                             
});    

createController.get('/about', (req, res, next) => {
    console.log( "ABOUT ......." );
    data.source = "secret/create";
    data.status.about = true;
    res.render('secret/create.hbs', data );
});

createController.get('/', (req, res, next) => {
  data.source = "secret/create";
  delete data.status.about;
  res.render('secret/create.hbs', data );
});

module.exports = createController;
