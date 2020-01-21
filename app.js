require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

//Authentication & Sessions
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const dbName = 'crafts-base';

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/crafts-base', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

//Authentication & Sessions
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 3600000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  resave: false,
  saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerPartials(__dirname + '/views/partials');

// default value for title local
app.locals.title = 'Crafts Base';
app.locals.subtitle = 'handcraft project management & administration';
app.locals.desc="The platform for your handcraft projects and management of all accessories you need!"
app.locals.version = '0.01';
app.locals.build = '0001';
// --------------------------------------------------------

// routes AUTH views --------------------------------------
const signup = require('./routes/auth/signup.js');
app.use('/signup', signup);

const login = require('./routes/auth/login.js');
app.use('/login/', login);

const logout = require('./routes/auth/logout.js');
app.use('/logout', logout);

// routes RESTRICTED views --------------------------------
//GENERAL
const object_delete = require('./routes/secret/delete.js');
app.use('/secret/delete', object_delete);

// PROJECT 
const project_overview = require('./routes/secret/project-overview.js');
app.use('/secret/project/view', project_overview);

const project_detail = require('./routes/secret/project-detail.js');
app.use('/secret/project/detail', project_detail);

const project_create = require('./routes/secret/project-create.js');
app.use('/secret/project/create', project_create);

const project_edit = require('./routes/secret/project-edit.js');
app.use('/secret/project/edit', project_edit);

const project_add_components = require('./routes/secret/project-add-component.js');
app.use('/secret/project/addcomponent', project_add_components);

// COMPONENT 
const component_overview = require('./routes/secret/component-overview.js');
app.use('/secret/component/view', component_overview);

const component_detail = require('./routes/secret/component-detail.js');
app.use('/secret/component/detail', component_detail);

const component_edit = require('./routes/secret/component-edit.js');
app.use('/secret/component/edit', component_edit);

const component_create = require('./routes/secret/component-create.js');
app.use('/secret/component/create', component_create);

const index = require('./routes/index');
app.use('/', index);

module.exports = app;
