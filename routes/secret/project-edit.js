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
      data.source = "/login/";
      delete data.status.about;
      res.render( 'auth/login.hbs', data );
    }                             
});    

editProjectController.get('/:pId', (req, res, next) => {
  let projectId = req.params.pId;
  console.log( "PRJ-EDIT PID:", projectId );
  Project.findById(projectId)
    .then((theProject) => {
      data.source = `/secret/project/edit/${theProject._id}`;
      data.project = theProject;

      data.project.checkedStatus = {};
      data.project.checkedStatus[data.project.status] = 'selected';

      console.log( "DATA PRJ", data);
      res.render('secret/project-edit.hbs', data );
    })
    .catch(error => {
      console.log('Error while retrieving project details: ', error);
      next(error);
    })
});

editProjectController.post('/:pId', (req, res, next) => {
  let projectId = req.params.pId;
  const {name, description, notes, status} = req.body;

  Project.findByIdAndUpdate(projectId, {name, description, notes, status})
      .then(() => { 
        res.redirect('/secret/project/view/');
      })
      .catch(err => {
        console.log('Error while editing project details: ', error);
        next(err);
      })
});

module.exports = editProjectController;
