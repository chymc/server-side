var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const multer = require('multer');
const upload = multer({});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var createRouter = require('./routes/create');
var mainRouter = require('./routes/main');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'DONT TELL ANYONE',
  cookie: { maxAge: 60 * 1000 }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',loginRouter);
app.use('/login',loginRouter);
app.use('/create',createRouter);
app.use('/register',registerRouter);
app.use('/main',mainRouter);
app.use('/logout',logoutRouter);
app.get('/hello',function(req,res) {

  res.send('This is testing hello world');

});
// app.get('/',function(req,res){

//   res.redirect('login');

// })
// app.get('/create',function(req,res){
//   res.send('This is create page');
//   console.log('create');
  
// });
// app.get('/update',function(req,res){
//   res.send('this is update page');
//   console.log('update');
  
// });
// app.get('/delete',function(req,res){
//   res.send('this is delete page');
//   console.log('delete');
  
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/api/restaurant', upload.single('filetoupload'), function (req, res, next) {
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
    newRest.owner = req.session.email;

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

/*const insertDoc = (res, doc) => {
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
                client.close();
            });
        });

        client.close();
    } else {
        //after failed
        res.send({ status: 'failed' });
    }
};
*/
/*app.get('/api/restaurant/name/:name', (req, res) => {
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
*/
/*app.get('/api/restaurant/borough/:borough', function (req, res, next) {
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
*/
/*app.get('/api/restaurant/cuisine/:cuisine', function (req, res, next) {
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
*/
const searchRestaurant = (db, criteria, callback) => {
    cursor = db.collection('restaurants').find(criteria);
    cursor.toArray((err, docs) => {
        assert.equal(err, null);
        //console.log(docs);
        callback(docs);
    });
}

module.exports = app;
