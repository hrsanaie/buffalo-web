try {

    var http = require("http");

    http.createServer(function (req, res) {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        res.writeHead(200, headers);//{"access-control-allow-origin": "*"});
        req.on('data', function (chunck) {

            if (req.method == "POST") { // cant access before authentication

                switch (req.url) {
                    case "/loginValidation":
                        if (!loginValidation(chunck)) {
                            res.write("Access Denied !!!");
                        }
                        var dt = JSON.parse(chunck);
                        var username = dt.username;
                        var password = dt.password;
                        res.write("Hello " + username);
                        break;
                }
            } else {
                res.writeHead(403, "Buffalo infosec corp Forbidden Error");
                res.end("Dear visitor your access is Forbidden");
            }
        });

        req.on('end', function () {
            res.end("finished");
        });

    }).listen("8080");

    function loginValidation(chunck) {

        if (chunck === null || JSON.parse(chunck).toString() === "" || chunck === undefined)
            return false;


        var jp = JSON.parse(chunck);

        var username = jp.username;
        var password = jp.password;


        console.log(username + " " + password);
        return true;

    }

}
catch
    (exc) {
    console.log(exc);
}