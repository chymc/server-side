const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

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

    let newRest = {
        "name": "",
        "owner": "",
        "borough": "",
        "cuisine": "",
        "address": {
            "street": "",
            "building": "",
            "zipcode": "",
            "coord": {
                "x": null,
                "y": null
            }
        },
        "grades": [{}]
    };
    //Mandatory attributes
    newRest.name = req.body.name;
    newRest.owner = req.session.email;

    //Optional attributes
    newRest.borough = req.body.borough;
    newRest.cuisine = req.body.cuisine;

    newRest.address.street = req.body.street;
    newRest.address.building = req.body.building;
    newRest.address.zipcode = req.body.zipcode;
    newRest.address.coord.x = req.body.coordx;
    newRest.address.coord.y = req.body.coordy;

    newRest.grades = [{}];

    insertDoc(res, newRest);
})

const insertDoc = (res, doc) => {
    /*let docObj = {};
    try {
        docObj = JSON.parse(doc);
        //console.log(Object.keys(docObj).length);
    } catch (err) {
        console.log(`${doc} : Invalid document!`);
    }*/
    if (Object.keys(doc).length > 0) {  // document has at least 1 name/value pair
        const client = new MongoClient(mongoDBurl);
        client.connect((err) => {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            db.collection('restaurant').insertOne(doc, (err, result) => {
                assert.equal(err, null);

                //after success

            });
        });
    } else {
        //after failed
    }
}


module.exports = router;
