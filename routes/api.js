var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({});

const ObjectID = require('mongodb').ObjectID;

// router.set('view engine', 'ejs');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoDBurl = 'mongodb+srv://NIck:Nick24182215@cluster0-9fcrc.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'miniproject';

router.post('/restaurant', upload.single('filetoupload'), function (req, res, next) {
    if (req.body.name.length == 0) {
        res.redirect('/');
    }
    console.log(req.file);

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
        "image": "",
        "mimetype": "",
        "grades": [{}]
    };
    //Mandatory attributes
    newRest.name = req.body.name;
    newRest.owner = req.session.name;

    //Optional attributes
    newRest.borough = req.body.borough;
    newRest.cuisine = req.body.cuisine;

    newRest.address.street = req.body.street;
    newRest.address.building = req.body.building;
    newRest.address.zipcode = req.body.zipcode;
    newRest.address.coord.x = req.body.coordx;
    newRest.address.coord.y = req.body.coordy;

    newRest.grades = [{}];

    if (req.file) {
        const encoded = req.file.buffer.toString('base64');
        const mimetype = req.file.mimetype;
        newRest.image = encoded;
        newRest.mimetype = mimetype;
    }
    

    insertDoc(res, newRest);
});

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
                //req.session.isCreate = true;
                //res.redirect('/');
                client.close();
            });
        });

        client.close();
    } else {
        //after failed
        res.send({ status: 'failed' });
    }
};

router.get('/restaurant/name/:name', (req, res) => {
    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        //console.log(req.params.name)
        let condition = { name: "/" + req.params.name + "/" };
        const db = client.db(dbName);
        searchRestaurant(db, condition, (restaurants) => {
            if (restaurants.length != 0) {
                res.status(200).json({ restaurants });
            }
            else {
                res.status(200).end('{}');
            }
        });
        client.close();
    });
});

router.get('/restaurant/borough/:borough', function (req, res, next) {
    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        let docObj = {}
        //console.log(req.params.name)
        let condition = { borough: "/" + req.params.borough + "/" };
        const db = client.db(dbName);
        searchRestaurant(db, condition, (restaurants) => {
            if (restaurants.length != 0) {
                res.status(200).json({ restaurants });
            }
            else {
                res.status(200).end('{}');
            }
        });
        client.close();
    });
});

router.get('/restaurant/cuisine/:cuisine', function (req, res, next) {
    const client = new MongoClient(mongoDBurl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        let docObj = {}
        //console.log(req.params.name)
        let condition = { cuisine: "/" + req.params.cuisine + "/" };
        const db = client.db(dbName);
        searchRestaurant(db, condition, (restaurants) => {
            if (restaurants.length != 0) {
                res.status(200).json({ restaurants });
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
