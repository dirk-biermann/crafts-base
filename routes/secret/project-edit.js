const express = require('express');
const createProjectController  = express.Router();

const data = { router: "project_edit", status: {} };

createProjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

createProjectController.get('/:id', (req, res, next) => {
  data.source = "/secret/project/edit/";
  res.render('secret/project-edit.hbs', data );
});

module.exports = createProjectController;
