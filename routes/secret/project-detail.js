const express = require('express');
const detailProjectController  = express.Router();

const data = { router: "project_detail", status: {} };

let Project = require('../../models/project');

detailProjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

detailProjectController.get('/:pId', (req, res, next) => {
  let projectId = req.params.pId;
  console.log( "PRJ-DETAIL PID:", projectId, req.param.pId)
  Project.findById(projectId)
    .then((theProject) => {
      data.source = `/secret/project/detail/${theProject._id}`;
      data.project = theProject;
      res.render('secret/project-detail.hbs', data );
    })
    .catch(error => {
      console.log('Error while retrieving project details: ', error);
      next(error);
    })
});

module.exports = detailProjectController;
