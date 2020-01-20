const express = require('express');
const editProjectController  = express.Router();

const data = { router: "project_edit", status: {} };

let Project = require('../../models/project');

editProjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

editProjectController.get('/:pId', (req, res, next) => {
  let projectId = req.params.pId;
  console.log( "PRJ-EDIT PID:", projectId, req.param.pId)
  Project.findById(projectId)
    .then((theProject) => {
      data.source = `/secret/project/edit/${theProject._id}`;
      data.project = theProject;
      res.render('secret/project-edit.hbs', data );
    })
    .catch(error => {
      console.log('Error while retrieving project details: ', error);
      next(error);
    })
});

module.exports = editProjectController;
