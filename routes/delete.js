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
                res.status(200).end('Success!');
            }
            else {
                res.status(200).end('Failed!');
            }
        });
        client.close();
    });
})

/*
//To check the document is owned by the logged in user or not
const canDelete = (res, doc) => {
    if (Object.keys(doc).length > 0) {  // document has at least 1 name/value pair
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
                
                if (docs[0].owner.equal(req.session.email)) {
                    checkResult = true;
                }
            });

            db.close;
            return checkResult;
        });
    } else {
        //after failed
        res.send({ status: 'failed' });
        return false;
    }
}
*/

/*
const deleteDoc = (res, doc) => {
    if (Object.keys(doc).length > 0) {  // document has at least 1 name/value pair
        const client = new MongoClient(mongoDBurl);
        client.connect((err) => {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            db.collection('restaurant').deleteOne(doc, (err, result) => {
                assert.equal(err, null);

                //after success
                var deleteCount = result.deletedCount;
                res.send({ status: 'OK', count: deleteCount });
                client.close();
            });
        });
    } else {
        //after failed
        res.send({ status: 'failed' });
    }
}
*/

const deleteDoc = (db, criteria, callback) => {
    db.collection('restaurants').deleteOne(criteria, (err, result) => {
        assert.equal(err, null);
        //after success
        var deleteCount = result.deletedCount;
        callback(deleteCount);
    });
}


module.exports = router;
