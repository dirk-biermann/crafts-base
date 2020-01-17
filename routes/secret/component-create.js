const express = require('express');
const createComponentController  = express.Router();

const data = { router: "component_create", status: {} };

createComponentController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

createComponentController.get('/fabric/about', (req, res, next) => {
    data.source = "/secret/component/create/fabric/";
    data.status.about = true;
    res.render('secret/component-create-fabric.hbs', data );
});
createComponentController.get('/pattern/about', (req, res, next) => {
    data.source = "/secret/component/create/pattern/";
    data.status.about = true;
    res.render('secret/component-create-pattern.hbs', data );
});

createComponentController.get('/fabric', (req, res, next) => {
  data.source = "/secret/component/create/fabric/";
  delete data.status.about;
  res.render('secret/component-create-fabric.hbs', data );
});

createComponentController.get('/pattern', (req, res, next) => {
  data.source = "/secret/component/create/pattern/";
  delete data.status.about;
  res.render('secret/component-create-pattern.hbs', data );
});

module.exports = createComponentController;
