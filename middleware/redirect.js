function redirect(app, mongoose) {

    app.get('/:shortid', function(req, res) {

        var short = req.params.shortid;

        var shortened = mongoose.model('url');
        shortened.find({
            short_url: short
        }, function(err, data) {
            if (err) {
                console.log(err);
            }
            else if (data.length === 0) {

                res.json({
                    "error": "No short url found for given input"
                });


            }
            else {

                var url = data[0].url;
                res.redirect(url);

            }

        });

    });
}

module.exports = redirect;