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

router.post('/', function (req, res, next) {
    var coordx = req.body.x;
    var coordy = req.body.y;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('<html> <head><title>rest</title><link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />  <!-- Make sure you put this AFTER Leaflet\'s CSS --> <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script> </head> <body> <div id="map" style="width: 900px; height: 580px"></div> <script>');
    res.write("var mapOptions = { center: [" + coordx + ", " + coordy + "], zoom: 18 } var map = new L.map('map', mapOptions); var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');  map.addLayer(layer); var marker = L.marker([" + coordx + ", " + coordy + "]); marker.addTo(map);");
    res.end('    </script> </body> </html>');

});



module.exports = router;
