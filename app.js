var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var cors = require('cors')

const getFazerRestaurantData = require('./utils/fazerScraper');
const getSodexoRestaurantData = require('./utils/sodexoScraper');
const getTaffaRestaurantData = require('./utils/taffa');
const getMaukasRestaurantData = require('./utils/maukas');

const a =  getFazerRestaurantData('abloc', 'en');
const d =  getSodexoRestaurantData('arvo', 'en');
const b=  getTaffaRestaurantData('en');
const c =  getMaukasRestaurantData('fi')

var indexRouter = require('./routes/index');
var reviewsRouter = require('./routes/reviews');
var restaurantRouter = require('./routes/restaurants');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/reviews', reviewsRouter);
app.use('/restaurants', restaurantRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

app.listen(4000, () => console.log(`Listening on port 4000`));

module.exports = app;
