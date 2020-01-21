const express = require('express');
const addComponentProjectController  = express.Router();

const data = { router: "project_detail", status: {} };

const Project = require('../../models/project');
const Fabric = require("../../models/fabric")
const Pattern = require("../../models/pattern")

addComponentProjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

addComponentProjectController.get('/:pId', async (req, res, next) => {
  try {
    const projectId = req.params.pId;
    data.source = `/secret/project/detail/${projectId}`;

    const owner = req.session.currentUser._id;

    const allFabrics = await Fabric.find( { owner: owner } );
    const allPatterns = await Pattern.find( { owner: owner } );
    const currentProject = await Project.findById(projectId);
    

    data.fabric = 
      allFabrics.filter( v_fa => { 
        const res = 
          currentProject.components.fabrics.findIndex( v_fp => { 
            console.log( "v_fa", v_fa._id, "v_fp", v_fp._id, "!==", v_fa._id.toString() !== v_fp._id.toString());
            return v_fa._id.toString() === v_fp._id.toString();
          });
        return res < 0;
      });

    data.pattern = 
      allPatterns.filter( v_pa => { 
        const res = 
          currentProject.components.pattern.findIndex( v_pp => { 
            console.log( "v_pa", v_pa._id, "v_pp", v_pp._id, "!==", v_pa._id.toString() !== v_pp._id.toString());
            return v_pa._id.toString() === v_pp._id.toString();
          });
        return res < 0;
      });
    
    data.project = currentProject;
    res.render("secret/project-add-component.hbs", data);
  } catch (err) {
    next(err);
  }
});

addComponentProjectController.post('/:pId', async (req, res, next) => {
  try {
    const projectId = req.params.pId;
    const componentSelection = req.body;
    const componentIds = Object.keys(componentSelection);

    data.source = `/secret/project/detail/${projectId}`;

    const owner = req.session.currentUser._id;

    const allFabrics = await Fabric.find({ owner: owner },'_id');
    const allPatterns = await Pattern.find({ owner: owner },'_id');
    const currentProject = await Project.findById(projectId);
    
    allFabrics.forEach( fabric => { if( componentIds.includes( fabric._id.toString() ) ) { currentProject.components.fabrics.push( fabric._id.toString() ) } });
    allPatterns.forEach( pattern => { if( componentIds.includes( pattern._id.toString() ) ) { currentProject.components.pattern.push( pattern._id.toString() ) } });

    await Project.findByIdAndUpdate( projectId, { $set: { components: currentProject.components } } );

    data.source = `/secret/project/detail/${projectId}`;
    res.redirect(`/secret/project/detail/${projectId}`);
  } catch (err) {
    next(err);
  }
});

module.exports = addComponentProjectController;
