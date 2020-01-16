const express = require('express');
const createComponentController  = express.Router();

const data = { router: "component_overview", status: {} };

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

createComponentController.get('/about', (req, res, next) => {
    data.source = "/secret/component/view/";
    data.status.about = true;
    res.render('secret/component-overview.hbs', data );
});

createComponentController.get('/', (req, res, next) => {
  data.source = "/secret/component/view/";
  delete data.status.about;
  res.render('secret/component-overview.hbs', data );
});

module.exports = createComponentController;
