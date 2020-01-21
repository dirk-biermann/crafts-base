const express = require('express');
const deleteObjectController  = express.Router();

const data = { router: "object_delete", status: {} };

const Fabric = require("../../models/fabric");
const Pattern = require("../../models/pattern");
const Project = require("../../models/project");

deleteObjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
}); 


deleteObjectController.get('/:type/:id/:pid', async (req, res, next) => {
  try {
    const type = req.params.type;
    const id = req.params.id;
    const pid = req.params.pid;

    data.source = `/secret/delete/${type}/${id}/${pid}`;
    
    if(type == "fabric-from-project") {       
        data.object = await Fabric.findById(id);
    }
    if(type == "pattern-from-project") {
        data.object = await Pattern.findById(id);
    }

    data.object.pid = pid;
    data.source = `/secret/project/detail/${pid}`;
    res.render('secret/delete.hbs', data );
  } catch (err) {
    next(err);
  }
});

deleteObjectController.post('/:type/:id/:pid', async (req, res, next) => {
  try {
    const type = req.params.type;
    const id = req.params.id;
    const pid = req.params.pid;
    data.source = `/secret/component/delete/${type}/${id}/${pid}`;
    
    const currentProject = await Project.findById(pid);

    if(type == "fabric") {
        console.log( "FAB DEL", type, id, pid );
        currentProject.components.fabrics = currentProject.components.fabrics.filter( element => {
                return element._id.toString() !== id.toString();
            });
    }
    if(type == "pattern") {
        console.log( "PRJ DEL", type, id, pid );
        currentProject.components.pattern = currentProject.components.pattern.filter( element => {
                return element._id.toString() !== id.toString();
            });
    } 
    await Project.findByIdAndUpdate( pid, { $set: { components: currentProject.components } } );
    res.redirect(`/secret/project/detail/${pid}`);
  } catch (err) {
    next(err);
  }
});

deleteObjectController.get('/:type/:id', (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    console.log( "TYPE", type );

    data.source = `/secret/delete/${type}/${id}`;
    if(type == "pattern") {
        Pattern.findById(id)
            .then((pattern) => { 
                data.object = pattern;
                console.log(data);
                res.render('secret/delete.hbs', data );
            })
            .catch(err => {
                next(err);
            })
    };
    if(type == "fabric") {
        Fabric.findById(id)
            .then((fabric) => {
                data.object = fabric;
                console.log("Inside fabric delete " , data)
                res.render('secret/delete.hbs', data )
            })
            .catch(err => {
                next(err);
            })
    }; 
    if(type == "project") {
        Project.findById(id)
            .then((project) => {
                data.object = project;
                console.log("Inside project delete " , data)
                res.render('secret/delete.hbs', data )
            })
            .catch(err => {
                next(err);
            })
    } 
});

deleteObjectController.post('/:type/:id', (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    data.source = `/secret/component/delete/${type}/${id}`;
    
    if(type == "pattern") {
        Pattern.findByIdAndRemove(id)
            .then(() => { 
                res.redirect('/secret/component/view/');
            })
            .catch(err => {
                next(err);
            })
    };
    if(type == "fabric") {
        Fabric.findByIdAndRemove(id)
            .then(() => {
                res.redirect('/secret/component/view/');
            })
            .catch(err => {
                next(err);
            })
    };
    if(type == "project") {
        Project.findByIdAndRemove(id)
            .then(() => {
                res.redirect('/secret/project/view/');
            })
            .catch(err => {
                next(err);
            })
    }
    
});


module.exports = deleteObjectController;