try {
    var http = require("http");
    var sql = require("mssql");

    var dbConfig = {
        server: "192.168.1.200",
        database: "testDB",
        user: "sa",
        password: "Sql2008",
        port: 1433
    };

    http.createServer(function (req, res) {

        req.on('data', function (chunk) { // run this Callback function per every request has been send with request parameter
            if (req.url == "/loginKon" && req.method == "POST") {//&& req.headers['referer'] === "http://localhost/buffalo/login.html") {
                // res.writeHead(200, {'Access-Control-Allow-Origin': 'http://localhost'});
                res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
                var conn = new sql.Connection(dbConfig);
                conn.connect().then(function () {
                    var req = new sql.Request(conn);
                    var dt = JSON.parse(chunk);
                    var username = dt.username;
                    var password = dt.password;
                    console.log(username + "    " + password);
                    var query = "select Id from users where username ='" + username + "' and pass ='" + password + "'";
                    req.query(query).then(function (recordset) {
                        res.end(JSON.stringify(recordset));
                        conn.close();
                    });

                }).catch(function (err) {
                    console.log(err);
                    conn.close();
                });


            }

        });
    }).listen('7419');

}
catch (exceptionMsg) {
    console.dir(exceptionMsg);
}