var shortid = require('shortid');

function newUrl(app, options) {

    app.use(function(req, res, next) {
        var submittedUrl = req.url.substring(5, this.length),
            shortened = options.mongoose.model('url');

        shortened.find({
            url: submittedUrl
        }, function(err, data) {
            if (err) {
                res.send('failed');
            }
            else if (data.length === 0) {
                var short = shortid.generate(),
                    newDocument = new shortened({
                        url: submittedUrl,
                        short_url: short
                    });
                newDocument.save(function(err, newDocument) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var newDocumentObj = {
                            original_url: newDocument.url,
                            short_url: newDocument.short_url
                        };
                        res.json(newDocumentObj);
                    }

                });



            }
            else {

                var entry = data[0],
                    obj = {
                        original_url: entry.url,
                        short_url: entry.short_url
                    };

                res.json(obj);

            }


        });

    });
}

module.exports = newUrl;