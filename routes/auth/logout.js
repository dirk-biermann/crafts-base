const express = require('express');
const logoutController = express.Router();
const User = require('../../models/user');

let data = { router: "logout" };

// GET /logout
logoutController.get('/', function(req, res, next) {
  console.log( "LOGOUT exec");

  if (req.session.currentUser) {
    console.log( "LOGOUT destroy");
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        next(err);
      } else {
        console.log( "LOGOUT clear cookie");
        res.clearCookie("connect.sid");

        console.log( "LOGOUT redirect");
        delete data.status.logged;
        res.redirect("/");
      }
    });
  }
});

module.exports = logoutController;
