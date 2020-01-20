const express = require('express');
const createComponentController  = express.Router();
const Fabric = require("../../models/fabric")
const Pattern = require("../../models/pattern")

const data = { router: "component_delete", status: {} };

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
    data.source = `/secret/component/delete/${type}/${id}`;
    if(type == "pattern") {
        Pattern.findById(id)
            .then((pattern) => { 
                data.componend = pattern;
                console.log(data);
                res.render('secret/component-delete.hbs', data );
            })
            .catch(err => {
                next(err);
            })
    };
    if(type == "fabric") {
        Fabric.findById(id)
            .then((fabric) => {
                data.componend = fabric;
                console.log("Inside fabric delete " , data)
                res.render('secret/component-delete.hbs', data )
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
    }
    
});


module.exports = createComponentController;