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
    // GET
    .get(function(request,response, error){
        // Display users
        var pagination = [];
        for(var i = 1; i <= response.locals.twitter_results; i++) {
            pagination[i-1] = i;
        }
        response.locals.twitter_user = response.locals.twitter_all_users[request.session.current_twitter];
        response.render("information/twitter", { pagination: pagination, current: request.session.current_twitter });
    })
    // POST
    .post(function(request,response){
        // Search users
        twitter_search(request.session.user, request.body.mysteriousperson);
        response.render("searching");
    });

router.route("/twitter/:id")
    // GET
    .get(function(request,response){
        // Change user displayed
        if(request.params.id < response.locals.twitter_results) {
            request.session.current_twitter = request.params.id;
        }
        response.redirect("/information/twitter");
    })

// Module Exports
module.exports = router;