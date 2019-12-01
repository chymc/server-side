var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const multer = require('multer');
const upload = multer({})
const ObjectID = require('mongodb').ObjectID;

router.set('view engine', 'ejs');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const mongoDBurl = 'mongodb+srv://NIck:Nick24182215@cluster0-9fcrc.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'test';

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('create');
    // res.status(200).render(path.join(__dirname, '/views/create.ejs'));  
    console.log('this is create');
    res.sendStatus(200);

});

/*
router.post('/', function (req, res, next) {
    if (req.body.name.length == 0) {
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
    if (Object.keys(doc).length > 0) {  // document has at least 1 name/value pair
        const client = new MongoClient(mongoDBurl);
        client.connect((err) => {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            db.collection('restaurants').insertOne(doc, (err, result) => {
                assert.equal(err, null);

                //after success
                var newID = result.insertedId;
                res.send({ status: 'OK', _id: newID });
                client.close();
            });
        });
    } else {
        //after failed
        res.send({ status: 'failed' });
    }
}
*/

module.exports = router;
