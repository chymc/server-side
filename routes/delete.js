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
    res.status(200).render(path.join(__dirname, '/views/delete.ejs'));
});

router.post('/', function (req, res, next) {
    let myQuery = { _id: ObjectId(req.body._id), owner: req.session.email };

    if (canDelete(res, myQuery)) {
        deleteDoc(res, myQuery);
    } else {
        res.status(400).render(path.join(__dirname, '/views/delete.ejs')); //Not the owner of the restaurant
        console.log("400");
    }

    
})

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

const deleteDoc = (res, doc) => {
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


module.exports = router;
