var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

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

router.get('/', function (req, res, next) {
    res.redirect('../search');
});

router.get('/_id/:_id', (req, res) => {
    
    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        let theCriteria = { _id: ObjectID(req.params._id) };
        searchRestaurant(db, theCriteria, (restaurants) => {
            if (restaurants.length != 0) {
                
                var aRest = restaurants[0];
                global.canRate = true;
                let isOwner = false;
                for (i = 1; i < aRest.grades.length; i++) {
                    console.log('session_name: ' + req.session.name);
                    console.log('rater: ' + aRest.grades[i].rater);
                    if (aRest.grades[i].rater == req.session.name){
                        global.canRate = false;
                        console.log(global.canRate);
                    }
                }
                if (req.session.name == aRest.owner) {
                    isOwner = true;
                }
                res.render('restaurant',{"restaurant":restaurants,"canRate":global.canRate,"isOwner":isOwner,"username":req.session.name});
              
                console.log('canRate Final: ' + global.canRate);
                
            }
            else {
                res.status(200).end('{}');
            }
        });
        client.close();
    });
});

const searchRestaurant = (db, criteria, callback) => {
    cursor = db.collection('restaurants').find(criteria);
    cursor.toArray((err, docs) => {
        assert.equal(err, null);
        //console.log(docs);
        callback(docs);
    });
}

module.exports = router;
