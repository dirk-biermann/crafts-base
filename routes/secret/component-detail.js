const express = require('express');
const createComponentController  = express.Router();

const data = { router: "component_detail", status: {} };

const Fabric = require("../../models/fabric")
const Pattern = require("../../models/pattern")

createComponentController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.username;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});

createComponentController.get('/:type/:id/:pid', (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    const pid = req.params.pid;
    console.log( "CD-PID", pid );
    data.source = `/secret/component/detail/${type}/${id}/${pid}`;
    if(type == "pattern") {
        Pattern.findById(id)
            .then((pattern) => { 
                pattern.type_prj = '-from-project';
                pattern.prjId = pid.toString();
                data.pattern = pattern;
                console.log(data);
                res.render('secret/component-detail-pattern.hbs', data );
            })
            .catch(err => {
                next(err);
            })
    };
    if(type == "fabric") {
        Fabric.findById(id)
            .then((fabric) => {
                fabric.type_prj = '-from-project';
                fabric.prjId = pid.toString();
                data.fabric = fabric;
                if(fabric.pattern === true){
                    data.fabric.hasPattern = "checked";
                }else{
                    data.fabric.noPattern = "checked";
                }
                console.log("Inside fabric edit " , data)
                res.render('secret/component-detail-fabric.hbs', data )
            })
            .catch(err => {
                next(err);
            })
    }; 
});

createComponentController.get('/:type/:id', (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    data.source = `/secret/component/detail/${type}/${id}`;
    if(type == "pattern") {
        Pattern.findById(id)
            .then((pattern) => { 
                data.pattern = pattern;
                console.log(data);
                res.render('secret/component-detail-pattern.hbs', data );
            })
            .catch(err => {
                next(err);
            })
    };
    if(type == "fabric") {
        Fabric.findById(id)
            .then((fabric) => {
                data.fabric = fabric;
                if(fabric.pattern === true){
                    data.fabric.hasPattern = "checked";
                }else{
                    data.fabric.noPattern = "checked";
                }
                console.log("Inside fabric edit " , data)
                res.render('secret/component-detail-fabric.hbs', data )
            })
            .catch(err => {
                next(err);
            })
    }; 
});

  
  module.exports = createComponentController;