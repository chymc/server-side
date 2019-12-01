var express = require('express');
var router = express.Router();
var title = 'Restaurant Collection System';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const mongoDBurl = 'mongodb+srv://NIck:Nick24182215@cluster0-9fcrc.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'miniproject';
router.get('/',(req,res,next)=>{
    const client = new MongoClient(mongoDBurl);
    if (!req.session.name)
        res.redirect('/login');
    else 
        {
            connectDB(client,res,req);
            
        }
    // client.close();
        
});

const connectDB = (client,res,req) => {
    client.connect((err)=>{

        assert.equal(null,err);
        console.log("Connect successfully to server");
        const db = client.db(dbName);
        showCollection(db,(restaurant)=>{
        res.render('main',{username:req.session.name,"restaurants":restaurant});
        });
        client.close();
        
    });



}

const showCollection = (db,callback) => {

    const cursor = db.collection('restaurants').find({});
    cursor.toArray((err,docs)=>{
        assert.equal(null,err);
        console.log("connected to db and finding restaurant collection");
        // console.log(docs);
        callback(docs);


    });


}

module.exports = router;