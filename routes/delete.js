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
const dbName = 'miniproject';


router.post('/', function (req, res, next) {
    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        let docObj = {}
        //console.log(req.params.name)
        let condition = { _id: ObjectId(req.body._id) };
        const db = client.db(dbName);
        deleteDoc(db, condition, (aResult) => {
            if (aResult != 0) {
                res.status(200).send('Success!<a href="/main">Back to main page</a>');
            }
            else {
                res.status(200).end('Failed!');
            }
        });
        client.close();
    });
})

const deleteDoc = (db, criteria, callback) => {
    db.collection('restaurants').deleteOne(criteria, (err, result) => {
        assert.equal(err, null);
        //after success
        var deleteCount = result.deletedCount;
        callback(deleteCount);
    });
}


module.exports = router;
