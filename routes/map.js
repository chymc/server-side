var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const multer = require('multer');
const upload = multer({})
const ObjectID = require('mongodb').ObjectID;


// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const mongoDBurl = 'mongodb+srv://NIck:Nick24182215@cluster0-9fcrc.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'miniproject';

router.post('/', function (req, res, next) {
    var coordx = req.body.x;
    var coordy = req.body.y;
    res.render('map', {x: coordx, y: coordy});

});



module.exports = router;
