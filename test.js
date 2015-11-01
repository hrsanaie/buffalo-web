var http = require('http');
var util = require('util')
http.createServer(function (req, res) {

    console.log('Request received: ');
    util.log(util.inspect(req)) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
    util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    res.writeHead(200, headers);
    req.on('data', function (chunk) {
        console.log('GOT DATA!');
    });
    res.end('callback(\'{\"msg\": \"OK\"}\')');

}).listen(8080);
console.log('Server running on port 8080');