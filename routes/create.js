const express = require('express');
var router = express.Router();

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const mongoDBurl = '';
const dbName = '';

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('create restaurant');
});

router.post('/', function (req, res, next) {
    if (req.query.name.length == 0) {
        res.redirect('/');
    }

    let newRest = {};
    //Mandatory attributes
    newRest.name = req.query.name;
    newRest.owner = req.session.email;

    //Optional attributes
    newRest.borough = req.query.borough;
    newRest.cuisine = req.query.cuisine;

    newRest.address.street = req.query.street;
    newRest.address.building = req.query.building;
    newRest.address.zipcode = req.query.zipcode;
    newRest.address.coord.x = req.query.coordx;
    newRest.address.coord.y = req.query.coordy;

    newRest.grades = [{}];

    insertDoc(res, newRest);
})

const insertDoc = (res, doc) => {
    let docObj = {};
    try {
        docObj = JSON.parse(doc);
        //console.log(Object.keys(docObj).length);
    } catch (err) {
        console.log(`${doc} : Invalid document!`);
    }
    if (Object.keys(docObj).length > 0) {  // document has at least 1 name/value pair
        const client = new MongoClient(mongoDBurl);
        client.connect((err) => {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            db.collection('restaurant').insertOne(docObj, (err, result) => {
                assert.equal(err, null);

                //after success

            });
        });
    } else {
        //after failed
    }
}


module.exports = router;
