const express = require('express');
const createComponentController  = express.Router();

const data = { router: "component_create", status: {} };

const Fabric = require("../../models/fabric.js")
const Pattern = require("../../models/pattern.js")

createComponentController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

createComponentController.get('/fabric', (req, res, next) => {
  data.source = "/secret/component/create/fabric/";
  res.render('secret/component-create-fabric.hbs', data );
});

createComponentController.post('/fabric', (req, res, next) => {
    data.source = "/secret/component/create/fabric/";
    const {name, description, length, width, imageUrl, material, color, pattern} = req.body;
    let currentUser = req.session.currentUser;
    const owner = currentUser._id;
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
  
  res.render('secret/component-create-pattern.hbs', data );
});

createComponentController.post('/pattern', (req, res, next) => {
  data.source = "/secret/component/create/pattern/";
  const {name, description, typeOfClothes, instructions, imageUrl} = req.body;
  let currentUser = req.session.currentUser;
  const owner = currentUser._id;
  
  Pattern.create({name, description, typeOfClothes, instructions, imageUrl, owner})
    .then(() => {
        res.render('secret/component-create-pattern.hbs', data );
      })
    .catch(err => {
        next(err);
      })
  });



module.exports = createComponentController;
