const express = require('express');
const createProjectController  = express.Router();

const data = { router: "project_detail", status: {} };

createProjectController.use((req, res, next) => {
    if (req.session.currentUser) {
        data.status.logged = true;
        data.name = req.session.currentUser.fullName;
        next();
    } else {
        data.source = "/";
        res.render("index.hbs", data );
    }                             
});    

createProjectController.get('/about', (req, res, next) => {
    data.source = "/secret/project/detail/";
    data.status.about = true;
    res.render('secret/project-detail.hbs', data );
});

createProjectController.get('/', (req, res, next) => {
  data.source = "/secret/project/detail/";
  delete data.status.about;

  data.project = {
        name: "project3",
        owner: "<user id>",
        description: "description",
        notes: "notes",
        components: [
          {
            name: "comp",
            description: "description"  
          },
          {
            name: "comp",
            description: "description",
            typeOfClothes: "Shirt" 
          },
          {
            name: "comp",
            description: "description"  
          }
        ],
        onModel: "Pattern",
        status: "New"
      };
  res.render('secret/project-detail.hbs', data );
});

module.exports = createProjectController;
