const express = require('express');
const createProjectController  = express.Router();

const data = { router: "project_detail", status: {} };

let Project = require('../../models/project');

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

createProjectController.get('/about/:pId', (req, res, next) => {
  let projectId = req.params.pId;
  data.source = `/secret/project/detail/${projectId}`;
  data.status.about = true;
  res.render('secret/project-detail.hbs', data );
});

createProjectController.get('/:pId', (req, res, next) => {
  let projectId = req.params.pId;
  console.log( "PID:", projectId, req.param.pId)
  Project.findById(projectId)
    .then((theProject) => {
      data.source = `/secret/project/detail/about/${theProject._id}`;
      delete data.status.about;
      data.project = theProject;
      res.render('secret/project-detail.hbs', data );
    })
    .catch(error => {
      console.log('Error while retrieving project details: ', error);
      next(error);
    })
});

module.exports = createProjectController;
