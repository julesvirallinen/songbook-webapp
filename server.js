    // server.js

    // set up ========================
    var express = require('express');
    var app = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var Biisit = require('./Biisi');

    var port = process.env.PORT || 8080;


    // configuration =================

    var url = 'mongodb://localhost/kanta';

    mongoose.connect(url);

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


    // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all biisi
    app.get('/api/biisit', function (req, res) {
        Biisit.find(function (err, biisi) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(biisi); // return all biisi in JSON format
        });
    });

    // create biisi and send back all biisi after creation
    app.post('/api/biisit', function (req, res) {

        // create a biisi, information comes from AJAX request from Angular
        Biisit.create({
            name: req.body.name,
            sanat: req.body.sanat,
            done: false
        }, function (err, biisi) {
            if (err)
                res.send(err);

            // get and return all the biisi after you create another
            Biisit.find(function (err, biisi) {
                if (err)
                    res.send(err)
                res.json(biisi);
            });
        });

    });

    // delete a biisi
    app.delete('/api/biisit/:biisi_id', function (req, res) {
        Biisit.remove({
            _id: req.params.biisi_id
        }, function (err, biisi) {
            if (err)
                res.send(err);

            // get and return all the biisi after you create another
            Biisit.find(function (err, biisi) {
                if (err)
                    res.send(err)
                res.json(biisi);
            });
        });
    });

    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/muuta', function (req, res) {
        res.sendfile('./public/muuta.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


    // listen (start app with node server.js) ======================================
app.listen(port, '0.0.0.0', function(err) {
  console.log("Started listening on %s", app.url)});