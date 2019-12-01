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
const mongoDBurl = 'mongodb+srv://NIck:Nick24182215@cluster0-9fcrc.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'miniproject';


router.get('/', function (req, res, next) {
    res.render('update', { _id: req.query._id });
    // res.status(200).render(path.join(__dirname, '/views/create.ejs'));  
    console.log('this is create');
    res.sendStatus(200);

});

router.post('/', function (req, res, next) {
    let myquery = { _id: ObjectID(req.body.restID) };
    let target = { 
        "address": {
            "coord": {}
        }
     };
    if (req.body.name) {
        target.name = req.body.name;
    }
    if (req.body.borough) {
        target.borough = req.body.borough;
    }
    if (req.body.cuisine) {
        target.cuisine = req.body.cuisine;
    }
    if (req.body.street) {
        console.log(req.body.street);
        target.address.street = req.body.street;
    }
    if (req.body.building) {
        target.address.building = req.body.building;
    }
    if (req.body.zipcode) {
        target.address.zipcode = req.body.zipcode;
    }
    if (req.body.coordx) {
        target.address.coord.x = req.body.coordx;
    }
    if (req.body.coordy) {
        target.address.coord.y = req.body.coordy;
    }
    let newValues = { $set: target };

    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        updateRestaurant(db, myquery, newValues, (editCount) => {
            if (editCount != 0) {
                res.status(200).send('Edit Success. <a href="/main">Back to main page</a>');
            }
            else {
                res.status(200).send('Failed! Make sure that you have at least edit one thing. <a href="/main">Back to main page</a>');
            }
        });
        client.close();
    });

});


const updateRestaurant = (db, criteria, toEdit, callback) => {
    db.collection('restaurants').updateOne(criteria, toEdit, function (err, res) {
        if (err) throw err;
        callback(res.result.nModified);
    });
}

module.exports = router;