// Get dependencies
let express = require('express');
let path = require('path');
let http = require('http');
let mongoose = require('mongoose');

let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// import the routing file to handle the default (index) route
let index = require('./server/routes/app');
const itemsRoutes = require('./server/routes/items');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ...

let app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/app')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/items', itemsRoutes);

//For 404
app.use((req, res, next) => {
  res.render('index')
});


// establish a connection to the mongo database
mongoose.connect('mongodb+srv://Stephanie:mFtKj6nKLfV3iyQG@cluster0.f4ift.mongodb.net/final-project-full-stack?retryWrites=true&w=majority',
  { useNewUrlParser: true }, (err, res) => {
    if (err) {
      console.log('Connection failed: ' + err);
    }
    else {
      console.log('Connected to database!');
    }
  }
);

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/app/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
