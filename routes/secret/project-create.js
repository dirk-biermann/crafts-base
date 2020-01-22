const express = require('express');
const createProjectController  = express.Router();

const data = { router: "project_create", status: {} };

let Project = require('../../models/project');

createProjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
        next();
    } else {
      data.source = "/login/";
      delete data.status.about;
      res.render( 'auth/login.hbs', data );
    }                             
});    

createProjectController.get('/', (req, res, next) => {
  data.source = "/secret/project/create/";
  res.render('secret/project-create.hbs', data );
});

createProjectController.post('/', (req, res, next) => {
    data.source = "/secret/project/create/";
    const {name, description, notes, status} = req.body;
    let currentUser = req.session.currentUser;
    const owner = currentUser._id;
    Project.create({name, description, notes, status, owner})
      .then(() => {
          res.render('secret/project-create.hbs', data );
        })
      .catch(err => {
          next(err);
        })
    });

module.exports = createProjectController;
