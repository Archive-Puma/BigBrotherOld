// Create Router
var router = require("express").Router();

// Routes
router.get("/", function(request, response) {
    response.render("information/twitter");
});

module.exports = router;