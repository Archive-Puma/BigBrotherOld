// Import Express library
var express = require("express");

// Create server
var server = express();

// Root Dir
server.get("/", function(request, response) {
    response.send("Hola mundo");
});

// Start server in port 8080
server.listen(8080);
