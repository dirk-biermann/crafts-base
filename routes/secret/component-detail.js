const express = require('express');
const createComponentController  = express.Router();

const data = { router: "component_detail", status: {} };

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

createComponentController.get('/', (req, res, next) => {
    data.source = "/secret/component/";
    data.pattern = [{ name: "pattern", typeOfClothes: "Shirt" },{ name: "pattern2", typeOfClothes: "Skirt" },{ name: "pattern3", typeOfClothes: "Trousers" }];
    res.render('secret/component-detail.hbs', data );
  });


module.exports = createComponentController;
