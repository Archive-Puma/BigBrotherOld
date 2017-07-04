// Import Server Library
var http = require('http');
// Import File IO Library
var fileIO = require("fs");

// Import my own libraries
var args = require("./js/args.js");

// Load index.html
fileIO.readFile("./index.html", function(error, index){
    // Raw index.html
    var index_raw = index.toString();
    // Custom Headers
    var headers = {
        "Content-Type": "text/html",
        "Content-Length": index_raw.length
    };

    // Create the server
    http.createServer(function(request, response) {
        // Set custom headers
        response.writeHeader(200,headers);
        // Parameters
        var params = args.parser(request);
        // Show index.html
        response.write(index);
        // Stop server response
        response.end();
    // Start server in port 8080
    }).listen(8080);
});