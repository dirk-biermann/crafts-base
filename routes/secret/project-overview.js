const express = require('express');
const createProjectController  = express.Router();

const data = { router: "project_overview", status: {} };

let Project = require('../../models/project');

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
    data.source = "/secret/project/view/";
    data.status.about = true;
    res.render('secret/project-overview.hbs', data );
});

createProjectController.get('/', (req, res, next) => {
  data.source = "/secret/project/view/";
  delete data.status.about;

  Project.find(function (err, projects) {
      if (err) {
          console.log(err);
      } else {
          data.projects = projects;
          res.render('secret/project-overview.hbs', data );
      }
  });

});

module.exports = createProjectController;
