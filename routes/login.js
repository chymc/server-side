var express = require('express');
var router = express.Router();
var title = 'Restaurant Collection System';

router.get('/',(req,res,next)=>{

    res.render('login',{title:title});

});
router.post('/',(req,res,next)=>{

    console.log("user email"+req.body.email);
    console.log("user password"+req.body.pass);
    // res.sendStatus(200);
    // res.send(`user email ${req.body.email}`);
    // res.write(`user password ${req.body.pass}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`user email ${req.body.email}`);
    res.write(`user password ${req.body.pass}`)
    res.end('okay');


});
module.exports = router;
