const express = require('express');
const createProjectController  = express.Router();

const data = { router: "project_edit", status: {} };

createProjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

createProjectController.get('/about', (req, res, next) => {
    data.source = "/secret/project/edit/";
    data.status.about = true;
    res.render('secret/project-edit.hbs', data );
});

createProjectController.get('/', (req, res, next) => {
  data.source = "/secret/project/edit/";
  delete data.status.about;
  res.render('secret/project-edit.hbs', data );
});

module.exports = createProjectController;
