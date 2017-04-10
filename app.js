var express = require('express')
var expressHBS = require('express-handlebars')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var helpers = require('./app.helpers.js')

var index = require('./routes/index')
var users = require('./routes/users')

var app = express()
var hbs = expressHBS.create({
	extname: '.hbs',
	defaultLayout: 'tpl/html',
	layoutsDir: 'views/',
	partialsDir: 'views/',
	helpers,
})

// globally accessible vars
app.locals.lang = 'en'
app.locals.navItems = [
	{ name: 'Home',    href: '/'         },
	{ name: 'About',   href: '/about/'   },
	{ name: 'Contact', href: '/contact/' },
]

// view engine setup
app.engine('.hbs', hbs.engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// establish the pages
app.use('/', index)
app.use('/users', users)

/* GET about page. */
app.get('/about', function (req, res) {
	res.render('default', { title: 'About' })
})
/* GET contact page. */
app.get('/contact', function (req, res) {
	res.render('default', { title: 'Contact' })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
