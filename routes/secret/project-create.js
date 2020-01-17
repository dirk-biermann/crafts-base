const express = require('express');
const createProjectController  = express.Router();

const data = { router: "project_create", status: {} };

createProjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
        next();
    } else {
        data.source = "/about";
        res.render("index.hbs", data );
    }                             
});    

createProjectController.get('/about', (req, res, next) => {
    data.source = "/secret/project/create/";
    data.status.about = true;
    res.render('secret/project-create.hbs', data );
});

createProjectController.get('/', (req, res, next) => {
  data.source = "/secret/project/create/about";
  delete data.status.about;
  res.render('secret/project-create.hbs', data );
});

module.exports = createProjectController;
