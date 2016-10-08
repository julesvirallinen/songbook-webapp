
    module.exports = function (app) {

    var Biisit = require('./Biisi');



    //Hakee kaikki biisit

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

    };
