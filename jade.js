// Import Express library
var express = require("express");

// Create server
var server = express();

// Set view
server.set("view engine","jade");

// Root Dir
server.get("/", function(request, response) {
    // Read Index Jade view
    response.render("index");
});

// Dir with params
server.get("/:name", function(request, response) {
    // Read Form with params
    console.log(request.params.name)
    response.render("form", {
        name: request.params.name
    });
});


// Root Form Request
server.post("/", function(request,response) {
    response.render("form");
});

// Start server in port 8080
server.listen(8080);