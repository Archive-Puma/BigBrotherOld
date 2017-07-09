// Create Router
var router = require("express").Router();

// Socials
var twitter_search = require("./socials/twitter").twitter_search;

// Routes
router.get("/", function(request, response) {

});

/* ------------------------------------ */
/* --------------- REST --------------- */
/* ------------------------------------ */

// Twitter
router.route("/twitter")
    .get(function(request,response){
        response.render("information/twitter");
    })
    .post(function(request,response){
        twitter_search(request.session.id, request.body.nickname);
        response.render("searching");
    });

router.route("/twitter/:id")
    .get(function(request,response){

    })
    .put(function(request,response){

    })
    .delete(function(request,response) {

    });


// Module Exports
module.exports = router;