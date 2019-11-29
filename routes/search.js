var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const mongoDBurl = 'mongodb+srv://NIck:Nick24182215@cluster0-9fcrc.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'test';

router.get('/', function (req, res, next) {
    res.status(200).render(path.join(__dirname, '/views/search.ejs'));
});

router.get('/name/:name', function (req, res, next) {
    let myQuery = { name: req.params.name };
    searchRestaurant(res, myQuery);
});

router.get('/borough/:borough', function (req, res, next) {
    let myQuery = { borough: req.params.borough };
    searchRestaurant(res, myQuery);
});

router.get('/cuisine/:cuisine', function (req, res, next) {
    let myQuery = { cuisine: req.params.cuisine };
    searchRestaurant(res, myQuery);
});



const searchRestaurant = (res, doc) => {
        const client = new MongoClient(mongoDBurl);
        client.connect((err) => {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            var cursor = db.collection('restaurant').find(doc);
            var checkResult = false;

            cursor.toArray((err, docs) => {
                assert.equal(err, null);
                client.close();
                console.log('Disconnected MongoDB');

                res.send(docs);

            });

            db.close;
            return checkResult;
        });
}



module.exports = router;
