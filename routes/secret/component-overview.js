const express = require('express');
const createComponentController  = express.Router();
const Fabric = require("../../models/fabric")
const Pattern = require("../../models/pattern")

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


createComponentController.get("/", async (req, res, next) => {
  try {
    data.source = "/secret/component/view/";
    const allFabrics = await Fabric.find();
    const allPatterns = await Pattern.find();
    data.fabric = allFabrics;
    data.pattern = allPatterns;
    res.render("secret/component-overview.hbs", data);
  } catch (err) {
    next(err);
  }
});



module.exports = createComponentController;
