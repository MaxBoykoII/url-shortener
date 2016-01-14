function redirect(app, options) {

    app.get('/:shortid', function(req, res) {

        var short = req.params.shortid;

        var shortened = options.mongoose.model('url');
        shortened.find({
            short_url: short
        }, function(err, data) {
            if (err) {
                res.send('failed');
            }
            else if (data.length === 0) {

                res.send('No such url');


            }
            else {

                var url = data[0].url;
                res.redirect(url);

            }

        });

    });
}

module.exports = redirect;