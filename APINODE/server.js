var http = require('http');
var request = require("request")
var options = {};
var port = process.env.port || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
    });
    options = {
        uri: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback='
    };
    options.uri = options.uri + req.url;
    options.uri = options.uri.replace("/?", "?");
    getFlickrData(res);
}).listen(port);

function getFlickrData(res) {
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.write((body));
            res.end();
        }
    })
}