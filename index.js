var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//Routes
var index = require('./routes/index');
var logs = require('./routes/logs');

var port = 3000;

var app = express();


//Setup view engine
app.set('views', path.join(__dirname, 'views')); // Views are in the views folder
app.set('view engine', 'ejs'); // View engine is Ejs

//View engine should be able to display 'Html' file using Ejs 
app.engine('html', require('ejs').renderFile);

//Setup Static folder for Client-side Angular-Use folder named 'client'
app.use(express.static(path.join(__dirname, 'client')));

//Setup Body-Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Setup route links(link physical routes to application links)
app.use('/', index);
app.use('/api', logs);


app.listen(port, function(){
    console.log('Server started on port...'+ port);
});