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
  .connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true})
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
  cookie: { maxAge: 360000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerPartials(__dirname + '/views/partials');

// default value for title local
app.locals.title = 'Craft Base - project administration';
app.locals.version = '0.01';
app.locals.build = '0001';

// --------------------------------------------------------

// routes AUTH views --------------------------------------
const signup = require('./routes/auth/signup.js');
app.use('/signup', signup);

const login = require('./routes/auth/login.js');
app.use('/login', login);

const logout = require('./routes/auth/logout.js');
app.use('/logout', logout);

// routes RESTRICTED views --------------------------------

/*
const create_room = require('./routes/secret/create.js');
app.use('/secret/create', create_room);

const edit_room = require('./routes/secret/edit.js');
app.use('/secret/edit', edit_room);

const delete_room = require('./routes/secret/delete.js');
app.use('/secret/delete', delete_room);
*/

// routes COMMON views ------------------------------------
/*
const rooms = require('./routes/view/rooms.js');
app.use('/view', rooms);
*/

const index = require('./routes/index');
app.use('/', index);

module.exports = app;
