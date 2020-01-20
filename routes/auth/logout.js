const express = require('express');
const logoutController = express.Router();
const User = require('../../models/user');

let data = { router: "logout", status: {} };

// GET /logout
logoutController.get('/', function(req, res, next) {
  if (req.session.currentUser) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        next(err);
      } else {
        res.clearCookie("connect.sid");
        res.redirect("/");
      }
    });
  }else{
    res.clearCookie("connect.sid");
    res.redirect("/");
  }

});

module.exports = logoutController;
