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

router.get('/', function (req, res, next) {
    if (!req.session.name)
        res.redirect('/login');
    else
        res.render('search',{username:req.session.name});
});


router.post('/name', function (req, res, next) {
    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        let docObj = {}
        //console.log(req.params.name)
        let condition = { name: req.body.name };
        console.log(condition);
        const db = client.db(dbName);
        searchRestaurant(db, condition, (restaurants) => {
            console.log(restaurants);
            if (restaurants.length != 0) {
                /*res.writeHead(200, { "Content-Type": "text/html" });
                res.write('<html><body>')
                for (i = 0; i < restaurants.length; i++) {
                    res.write('<a href="/restaurant/_id/' + restaurants[i]._id + '">' + restaurants[i].name + '</a><br/>');
                }
                res.end('</body></html>');*/
                res.render('main',{username:req.session.name,"restaurants":restaurants});
     
            }
            else {
                res.render('main',{username:req.session.name,"restaurants":restaurants});
     
            }
        });
        client.close();
    });
});

router.post('/borough', function (req, res, next) {
    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        let docObj = {}
        //console.log(req.params.name)
        let condition = { borough: req.body.borough };
        console.log(condition);
        const db = client.db(dbName);
        searchRestaurant(db, condition, (restaurants) => {
            console.log(restaurants);
            if (restaurants.length != 0) {
               /* res.writeHead(200, { "Content-Type": "text/html" });
                res.write('<html><body>')
                for (i = 0; i < restaurants.length; i++) {
                    res.write('<a href="/restaurant/_id/' + restaurants[i]._id + '">' + restaurants[i].name + '</a><br/>');
                }
                res.end('</body></html>');*/
                res.render('main',{username:req.session.name,"restaurants":restaurants});
     
            }
            else {
                // res.status(200).end('{}');
                res.render('main',{username:req.session.name,"restaurants":restaurants});
     
            }
        });
        client.close();
    });
});

router.post('/cuisine', function (req, res, next) {
    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        let docObj = {}
        //console.log(req.params.name)
        let condition = { cuisine: req.body.cuisine };
        console.log(condition);
        const db = client.db(dbName);
        searchRestaurant(db, condition, (restaurants) => {
            console.log(restaurants);
            if (restaurants.length != 0) {
               /* res.writeHead(200, { "Content-Type": "text/html" });
                res.write('<html><body>')
                for (i = 0; i < restaurants.length; i++) {
                    res.write('<a href="/restaurant/_id/' + restaurants[i]._id + '">' + restaurants[i].name + '</a><br/>');
                }
                res.end('</body></html>');*/
                res.render('main',{username:req.session.name,"restaurants":restaurants});
     
            }
            else {
                res.render('main',{username:req.session.name,"restaurants":restaurants});
     
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
