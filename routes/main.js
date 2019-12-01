var express = require('express');
var router = express.Router();
var title = 'Restaurant Collection System';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const mongoDBurl = 'mongodb+srv://NIck:Nick24182215@cluster0-9fcrc.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'miniproject';
router.get('/',(req,res,next)=>{
    if (req.session.name=="")
        res.redirect('/login');
    else 
        res.render('main',{username:req.session.name});

});

module.exports = router;