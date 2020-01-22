const express = require('express');
const editComponentController  = express.Router();

const data = { router: "component_edit", status: {} };

const Fabric = require("../../models/fabric")
const Pattern = require("../../models/pattern")

editComponentController.use((req, res, next) => {
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

editComponentController.get('/:type/:id', (req, res, next) => {
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
editComponentController.post('/:type/:id', (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    data.source = `/secret/component/edit/${type}/${id}`;
    

    if(type == "pattern") {
        const {name, description, typeOfClothes, instructions, imageUrl} = req.body;
        Pattern.findByIdAndUpdate(id, {name, description, typeOfClothes, instructions, imageUrl})
            .then(() => { 
                res.redirect('/secret/component/view/');
            })
            .catch(err => {
                next(err);
            })
    };

    if(type == "fabric") {
        const {name, description, length, width, imageUrl, material, color, pattern} = req.body;
        Fabric.findByIdAndUpdate(id, {name, description, length, width, imageUrl, material, color, pattern})
            .then(() => {
                res.redirect('/secret/component/view/');
            })
            .catch(err => {
                next(err);
            })
    }
    
});


module.exports = editComponentController;