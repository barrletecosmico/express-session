const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const { use } = require('./routes/index');

// Setting
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
// Entiende los datos que llegan de un formulario
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'mysecretsesion',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


// Variables Globales
app.use((req, res, next) => {
    app.locals.message = req.flash('success');
    next();
})


// Routes
app.use(require('./routes/index'));


// Server
app.listen(3000);
console.log('Server on port', 3000);