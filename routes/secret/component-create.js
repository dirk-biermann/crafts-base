const express = require('express');
const createComponentController  = express.Router();

const Fabric = require("../../models/fabric.js")

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

createComponentController.post('/fabric', (req, res, next) => {
    data.source = "/secret/component/create/fabric/";
    const {name, description, length, width, imageUrl, material, color, pattern} = req.body;
    let currentUser = req.session.currentUser;
    console.log(req.session.currentUser);
    const owner = currentUser._id;
    delete data.status.about;
    Fabric.create({name, description, length, width, imageUrl, material, color, pattern, owner})
      .then(() => {
          res.render('secret/component-create-fabric.hbs', data );
        })
      .catch(err => {
          next(err);
        })
    });

createComponentController.get('/pattern', (req, res, next) => {
  data.source = "/secret/component/create/pattern/";
  delete data.status.about;
  res.render('secret/component-create-pattern.hbs', data );
});

module.exports = createComponentController;
