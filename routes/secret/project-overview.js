const express = require('express');
const createProjectController  = express.Router();

const data = { router: "project_overview", status: {} };

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
    data.source = "/secret/project/view/";
    data.status.about = true;
    res.render('secret/project-overview.hbs', data );
});

createProjectController.get('/', (req, res, next) => {
  data.source = "/secret/project/view/";
  delete data.status.about;

  data.projects = [
      {
        name: "project1",
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
      },
      {
        name: "project1",
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
      },
      {
        name: "project1",
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
      },
      {
        name: "project1",
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
      },
      {
        name: "project1",
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
      },
      {
        name: "project1",
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
      },
      {
        name: "project1",
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
      },
      {
        name: "project1",
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
      },
      {
        name: "project1",
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
      },
      {
        name: "project2",
        owner: "<user id>",
        description: "description",
        notes: "notes",
        components: [
          {
            name: "comp",
            description: "description",  
            typeOfClothes: "Skirt" 
          },
          {
            name: "comp",
            description: "description"  
          },
          {
            name: "comp",
            description: "description"  
          }
        ],
        onModel: "Fabric",
        status: "New"
      }
    ];

  res.render('secret/project-overview.hbs', data );
});

module.exports = createProjectController;
