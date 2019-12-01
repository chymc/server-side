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
                console.log(canRate);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write('<html><body>')
                res.write('<img src="data:' + aRest.mimetype + ';base64, ' + aRest.image + '" /><br />');
                res.write('Name: ' + aRest.name + '<br />');
                res.write('Corough: ' + aRest.borough + '<br />');
                res.write('Cuisine: ' + aRest.cuisine + '<br />');
                res.write('Street: ' + aRest.address.street + '<br />');
                res.write('Building: ' + aRest.address.building + '<br />');
                res.write('Zipcode: ' + aRest.address.zipcode + '<br />');
                res.write('GPS Coordinate (lon.): ' + aRest.address.coord.x + '<br />');
                res.write('GPS Coordinate (lat.): ' + aRest.address.coord.y + '<br />');
                for (i = 1; i < aRest.grades.length; i++) {
                    console.log('session_name: ' + req.session.name);
                    console.log('rater: ' + aRest.grades[i].rater);
                    //console.log(aRest.grades.rater == req.session.name);
                    //console.log(canRate);
                    if (aRest.grades[i].rater == req.session.name){
                        global.canRate = false;
                        console.log(global.canRate);
                    }
                    res.write('<p>');
                    res.write('Date: ' + aRest.grades[i].date + '<br />');
                    res.write('Grade: ' + aRest.grades[i].grade + '<br />');
                    res.write('Score: ' + aRest.grades[i].score + '<br />');
                    res.write('</p><br />');
                }
                if (req.session.name == aRest.owner) {
                    res.write('<a href="/update?_id=' + aRest._id + '">Update Info.</a><br />');
                    res.write('<form action="/delete" method="post">');
                    res.write('<input type="hidden" name="_id" value="' + aRest._id + '"/>');
                    res.write('<input type="submit" value="Delete" />');
                    res.write('</form><br />');
                }
                
                console.log('canRate Final: ' + global.canRate);
                if (global.canRate == true){
                    res.write('<a href="/rate?restID=' + aRest._id + '&restName=' + aRest.name + '">Rate this restaurant</a><br />');
                }

                res.write('<form action="/map" method="post">');
                res.write('<input type="hidden" name="x" value="' + aRest.address.coord.x + '"/>');
                res.write('<input type="hidden" name="y" value="' + aRest.address.coord.y + '"/>');
                res.write('<input type="submit" value="Map" />');
                res.write('</form><br />');

                res.end('</body></html>');
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
