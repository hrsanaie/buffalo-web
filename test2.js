var http = require('http');
var querystring = require('querystring');
var util = require('util');


http.createServer(function (req, res) {
  // set up some routes

  switch(req.url) {

case '/':
  // show the user a simple form
  console.log("[200] " + req.method + " to " + req.url);
  res.writeHead(200, "OK", {'Content-Type': 'text/html'});
  res.write('<html><head><title>Hello Noder!</title></head><body>');
  res.write('<h1>Welcome Noder, who are you?</h1>');
  res.write('<form enctype="application/x-www-form-urlencoded" action="/formhandler" method="post">');
  res.write('Name: <input type="text" name="username" value="John Doe" /><br />');
  res.write('Age: <input type="text" name="userage" value="99" /><br />');
  res.write('<input type="submit" />');
  res.write('</form></body></html');
  res.end();
  break;
case '/formhandler':


  if (req.method == 'POST') {
    console.log("[200] " + req.method + " to " + req.url);
    var fullBody = '';
    
    req.on('data', function(chunk) {
      // append the current chunk of data to the fullBody variable
      fullBody += chunk.toString();
    });
    
    req.on('end', function() {
    
      // request ended -> do something with the data
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      
      // parse the received body data
      var decodedBody = querystring.parse(fullBody);

      // output the decoded data to the HTTP response          
      res.write('<html><head><title>Post data</title></head><body><pre>');
      res.write(util.inspect(decodedBody));
      res.write('</pre></body></html>');
      
      res.end();
    });
    
  } else {
    console.log("[405] " + req.method + " to " + req.url);
    res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
    res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
  }
  
  break;





  };
}).listen(8080); // listen on tcp port 8080 (all interfaces)
