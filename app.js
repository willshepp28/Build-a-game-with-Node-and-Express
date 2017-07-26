// Require Modules \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const handlebars = require('express-handlebars');
const session = require('express-session');
const expressValidator = require('express-validator');
const index = require('./routes/index');




const app = express();





// Start Static Files  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use('/assets', express.static(path.join(__dirname, 'public')));




// Start View Engine  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))


// app.use(function(req,res,next) {
//   const guesses = req.session.guesses;
  
//   next();
// });




// Route Handlers \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use('/', index);




// Start Server \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.listen(3000, function() {
    console.log('Server listening on port 3000');
});