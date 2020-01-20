const express = require('express');
const createComponentController  = express.Router();
const Fabric = require("../../models/fabric")
const Pattern = require("../../models/pattern")

const data = { router: "object_delete", status: {} };

createComponentController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

createComponentController.get('/:type/:id', (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
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

createComponentController.post('/:type/:id', (req, res, next) => {
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


module.exports = createComponentController;