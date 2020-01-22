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
  const projectId = req.params.pId;
  
  console.log( "PRJ-DETAIL PID:", projectId )
  Project.findById(projectId)
         .populate('components.fabrics')
         .populate('components.pattern')
    .then((theProject) => {
      data.source = `/secret/project/detail/${theProject._id}`;
      
      theProject.components.fabrics.forEach(element => element.defImage = "/images/def-fabric.png");
      theProject.components.pattern.forEach(element => element.defImage = "/images/def-pattern.png");

      // mark components for deleting them only out of project
      theProject.components.fabrics.forEach( element => { element.type_prj = '-from-project'; element.prjId = theProject._id.toString(); } );
      theProject.components.pattern.forEach( element => { element.type_prj = '-from-project'; element.prjId = theProject._id.toString(); } );
  
      data.project = theProject;
      res.render('secret/project-detail.hbs', data );
    })
    .catch(error => {
      console.log('Error while retrieving project details: ', error);
      next(error);
    })
});

module.exports = detailProjectController;
