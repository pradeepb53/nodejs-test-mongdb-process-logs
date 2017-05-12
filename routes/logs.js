var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://pradeep:pradeep@ds151059.mlab.com:51059/mytasklist_pradeep', ['logs']);

//Get all log events
router.get('/logs/', function (req, res, next) {
    // res.send('Logs API');
    db.logs.find((err, logs) => {
        if (err) {
            res.send(err);
            res.json(err);
            
        }
        res.json(logs);
    });

});

//Get a single log event
router.get('/log/:id', function (req, res, next) {

    db.logs.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, log) => {

        if (err) {
            res.send(err);
        }
        res.json(log);
    });

});


// Save a log event
router.post('/log/', function (req, res, next) {
    var log = req.body;
    if (!log.message_id) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.logs.save(log, (err, log) => {
            if (err) {
                res.send(err);
            }
            res.json(log);
        });
    }

});

//Update a log event
router.put('/log/:id', function (req, res, next) {

    var log = req.body;
    var updateLog = {};

    if (log.message_id) {
        updateLog.message_id = log.message_id;
    }
    if (log.message_type) {
        updateLog.message_type = log.message_type;
    }
    if (log.severity) {
        updateLog.severity = log.severity;
    }
    if (log.from_ip) {
        updateLog.from_ip = log.from_ip;
    }
    if (log.message) {
        updateLog.message = log.message;
    }

    if (!updateLog) {
        res.status(400);
        res.json({
            "error": "Update failed!"
        });
    } else {
        db.logs.update({ _id: mongojs.ObjectId(req.params.id) }, updateLog, {}, (err, log) => {

            if (err) {
                res.send(err);
            }
            res.json(log);
        });
    }


});

//Delete a log event
router.delete('/log/:id', function (req, res, next) {

    db.logs.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, log) => {

        if (err) {
            res.send(err);
        }
        res.json(log);
    });

});

module.exports = router;