var express = require('express');
var router = express.Router();
var title = 'Restaurant Collection System';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const mongoDBurl = 'mongodb+srv://NIck:Nick24182215@cluster0-9fcrc.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'miniproject';
router.get('/',(req,res,next)=>{

    res.render('login',{title:title});

});
router.post('/',(req,res,next)=> {
    var q = {'userid':req.body.user, 'password':req.body.pass};
    console.log("user name"+req.body.user);
    console.log("user password"+req.body.pass);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const client = new MongoClient(mongoDBurl);
    client.connect((err)=>{
        assert.equal(null,err);
        console.log("Connect successfully to server");
        const db = client.db(dbName);
        findUser(db,q,(results)=>{
            client.close();
            console.log('disconnected');
            console.log(`This is result ${results}`);
            if (results>0)
                res.write('account existed');
            else
                res.write('no account');
            res.end('okay');

        });


    });

});




const findUser = (db,query,callback) => {
         db.collection('user').find(query).limit(1).count()
        .then(numDocs => {
            console.log(`${numDocs} documents match the specified query.`)
            callback(numDocs);
    })
        .catch(err => console.error("Failed to count documents: ", err))

}


module.exports = router;



