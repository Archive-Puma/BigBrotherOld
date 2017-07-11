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
    .get(function(request,response, error){
        var pagination = [];
        for(var i = 1; i <= response.locals.twitter_results; i++) {
            pagination[i-1] = i;
        }
        response.locals.twitter_user = response.locals.twitter_all_users[request.session.current_twitter];
        response.render("information/twitter", { pagination: pagination, current: request.session.current_twitter });
    })
    .post(function(request,response){
        twitter_search(request.session.user, request.body.nickname);
        response.render("searching");
    });

router.route("/twitter/:id")
    .get(function(request,response){
        if(request.params.id < response.locals.twitter_results) {
            request.session.current_twitter = request.params.id;
        }
        response.redirect("/information/twitter");
    })
    .put(function(request,response){

    })
    .delete(function(request,response) {

    });


// Module Exports
module.exports = router;