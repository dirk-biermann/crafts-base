const express = require('express');
const viewProjectController  = express.Router();

const data = { router: "project_overview", status: {} };

let Project = require('../../models/project');

viewProjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

viewProjectController.get('/', (req, res, next) => {
  data.source = "/secret/project/view/";
  const owner = req.session.currentUser._id;

  Project.find( { owner: owner }, null , function (err, projects) {
      if (err) {
          console.log(err);
      } else {
          data.projects = projects;
          res.render('secret/project-overview.hbs', data );
      }
  });
});

module.exports = viewProjectController;
