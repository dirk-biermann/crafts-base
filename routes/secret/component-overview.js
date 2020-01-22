const express = require('express');
const viewComponentController  = express.Router();

const data = { router: "component_overview", status: {} };

const Fabric = require("../../models/fabric")
const Pattern = require("../../models/pattern")

viewComponentController.use((req, res, next) => {
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


viewComponentController.get("/", async (req, res, next) => {
  try {
    data.source = "/secret/component/view/";
    const owner = req.session.currentUser._id;
    const allFabrics = await Fabric.find({owner: owner});
    const allPatterns = await Pattern.find({owner: owner});
    allFabrics.forEach(element => element.defImage = "/images/def-fabric.png");
    allPatterns.forEach(element => element.defImage = "/images/def-pattern.png");
    data.fabric = allFabrics;
    data.pattern = allPatterns;
    
    res.render("secret/component-overview.hbs", data);
  } catch (err) {
    next(err);
  }
});



module.exports = viewComponentController;
