const express = require('express');
const createComponentController  = express.Router();
const Fabric = require("../../models/fabric")
const Pattern = require("../../models/pattern")

const data = { router: "component_edit", status: {} };

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
    data.source = `/secret/component/edit/${type}/${id}`;
    

    if(type == "pattern") {
        Pattern.findById(id)
            .then((pattern) => { 
                data.pattern = pattern;
                console.log(data);
                res.render('secret/component-edit-pattern.hbs', data );
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
                res.render('secret/component-edit-fabric.hbs', data )
            })
            .catch(err => {
                next(err);
            })
    } 
});

createComponentController.post('/:type/:id', (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    data.source = `/secret/component/edit/${type}/${id}`;
    

    if(type == "pattern") {
        const {title, description, typeOfClothes, instructions, imageUrl} = req.body;
        Pattern.findByIdAndUpdate(id, {title, description, typeOfClothes, instructions, imageUrl})
            .then(() => { 
                res.redirect('/secret/component/view/');
            })
            .catch(err => {
                next(err);
            })
    };

    if(type == "fabric") {
        const {title, description, length, width, imageUrl, material, color, pattern} = req.body;
        Fabric.findByIdAndUpdate(id, {title, description, length, width, imageUrl, material, color, pattern})
            .then(() => {
                res.redirect('/secret/component/view/');
            })
            .catch(err => {
                next(err);
            })
    }
    
});


module.exports = createComponentController;