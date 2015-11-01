var http = require("http");
var sql = require("mssql");

var dbConfig = {
    server: "192.168.1.200",
    database: "BnpCashDB",
    user: "sa",
    password: "Sql2008",
    port: 1433
};

outputt = new Array();

http.createServer(function (req, res) {

    req.on('data', function (chunk) {

        if (req.url == "/loginKon" && req.method == "POST" && req.headers['referer'] === "http://localhost/buffalo/login.html") {
            res.writeHead(200, {'Access-Control-Allow-Origin': 'http://localhost'});

            var conn = new sql.Connection(dbConfig);
            conn.connect().then(function () {
                var req = new sql.Request(conn);
                req.query("SELECT * from tblnoe").then(function (recordset) {
                    //console.log(recordset);
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


function getEmp() {
    try {
        var conn = new sql.Connection(dbConfig);
        conn.connect().then(function () {
            var req = new sql.Request(conn);
            req.query("SELECT * from tblnoe").then(function (recordset) {
                //console.log(recordset);
                outputt.push(recordset);
                conn.close();
            });

        }).catch(function (err) {
            console.log(err);
            conn.close();
        });
    }
    catch
        (exc) {
        console.log(exc);
    }
}
