var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //res.send('INDEX Page of logs app');
     res.render('index.html');
});

module.exports = router;