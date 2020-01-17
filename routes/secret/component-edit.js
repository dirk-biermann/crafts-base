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
        data.source = "/about";
        res.render("index.hbs", data );
    }                             
});    

createComponentController.get('/about/:type/:id', (req, res, next) => {
    let type = req.params.type;
    let id = req.params.id;
    data.source =`/secret/component/edit/${type}/${id}`;
    data.status.about = true;

    if(type == "pattern") res.render('secret/component-edit-pattern.hbs', data );
    if(type == "fabric") res.render('secret/component-edit-fabric.hbs', data )
});

createComponentController.get('/:type/:id', (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    data.source = `/secret/component/edit/about/${type}/${id}`;
    delete data.status.about;

    if(type == "pattern") {
        Pattern.findById(id)
            .then((data) => { 
                res.render('secret/component-edit-pattern.hbs', data );
            })
            .catch(err => {
                next(err);
            })
    };

    if(type == "fabric") {
        Fabric.findById(id)
            .then((data) => {
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
    data.source = `/secret/component/edit/about/${type}/${id}`;
    delete data.status.about;

    if(type == "pattern") {
        const {name, description, typeOfClothes, instructions, imageUrl} = req.body;
        Pattern.findByIdAndUpdate(id, {name, description, typeOfClothes, instructions, imageUrl})
            .then(() => { 
                res.render('secret/component-edit-pattern.hbs', data );
            })
            .catch(err => {
                next(err);
            })
    };

    if(type == "fabric") {
        const {name, description, length, width, imageUrl, material, color, pattern} = req.body;
        Fabric.findByIdAndUpdate(id, {name, description, length, width, imageUrl, material, color, pattern})
            .then(() => {
                res.render('secret/component-edit-fabric.hbs', data )
            })
            .catch(err => {
                next(err);
            })
    }
    
  });


module.exports = createComponentController;