var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{

    res.render('login',{title:'this is server side project'});

});
module.exports = router;
