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
    allFabrics.forEach(element => element.defImage = "/images/def-fabric.png");
    allPatterns.forEach(element => element.defImage = "/images/def-pattern.png");
    data.fabric = allFabrics;
    data.pattern = allPatterns;
    console.log( "Component Overview", data );
    res.render("secret/component-overview.hbs", data);
  } catch (err) {
    next(err);
  }
});



module.exports = createComponentController;
