var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


// router.set('view engine', 'ejs');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
const mongoDBurl = 'mongodb+srv://NIck:Nick24182215@cluster0-9fcrc.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'miniproject';


router.get('/', function (req, res, next) {
    res.render('rate', {restID: req.query.restID, restName: req.query.restName});
    // res.status(200).render(path.join(__dirname, '/views/create.ejs'));  
    console.log('this is rate');
    res.sendStatus(200);

});

router.post('/', function (req, res, next) {
    let myquery = { _id: ObjectID(req.body._id) };
    let target = {};
    target.date = new Date(Date.now());
    target.rater = req.session.name;
    target.grade = req.body.grade;
    target.score = req.body.score;

    let newValues = { $push: {"grades": target} };

    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        updateRestaurant(db, myquery, newValues, (editCount) => {
            if (editCount != 0) {
                res.status(200).send('Rate Success! <a href="/main">Back to main page</a>');
            }
            else {
                res.status(200).end('Failed!');
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