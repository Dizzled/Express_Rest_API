var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var sqlite = require('sqlite3');
var sqliteStoreFactory = require('express-session-sqlite').default;
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const handlebars = require('./util/handlebars')(exphbs);
const db = require('./database');
const fileUpload = require('express-fileupload');
var flash = require('express-flash');
var index = require('./routes/');
var user = require('./routes/user');
var login = require('./routes/login');
var profile = require('./routes/profile');
var register = require('./routes/register');
var upload = require('./routes/upload');
var img = require('./routes/img');
var messages = require('./routes/messages');
var logout = require('./routes/logout');
var usermessage = require('./routes/usermessage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

const SqliteStore = sqliteStoreFactory(session);
const DBSOURCE = "db.sqlite"

app.use(session({
  store: new SqliteStore({
    // Database library to use. Any library is fine as long as the API is compatible
    // with sqlite3, such as sqlite3-offline
    driver: sqlite.Database,
    // for in-memory database
    path: DBSOURCE,
    // path: '/tmp/sqlite.db',
    // Session TTL in milliseconds
    ttl: 3600000,
    // (optional) Session id prefix. Default is no prefix.
    prefix: 'sess:',
    // (optional) Adjusts the cleanup timer in milliseconds for deleting expired session rows.
    // Default is 5 minutes.
    cleanupInterval: 300000
  }),
  resave: false,
  saveUninitialized: false,
  secret: "test123",
  secure: false
  //... don't forget other expres-session options you might need
}));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images')); 
app.use(fileUpload());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(flash());
app.use('/', index);
app.use('/user', user);
app.use('/login', login);
app.use('/profile', profile);
app.use('/register', register);
app.use('/upload', upload);
app.use('/img', img);
app.use('/messages', messages);
app.use('/logout', logout);
app.use('/usermessage', usermessage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;