// Import Schema
var twitter_user = require("./models/twitter/user").twitter_user;

// Module Exports
module.exports = function(request, response, next) {
    // If user does not search anything ...
    if(!request.session.user) {
        response.redirect("/");
        // ... else ...
    } else {
        // Show user's search
        twitter_user.find({ session:request.session.user }, function(error, document) {
            // If there is an error ...
            if(error) {
                console.log(error);
                response.redirect("/");
                // ... else ...
            } else {
                // Twitter User Information
                response.locals.twitter_all_users = document;
                response.locals.twitter_results = Object.keys(document).length; 
                // Current profile
                if(!request.session.current_twitter) {
                    request.session.current_twitter = 0;
                }

                next();
            }
        });
    }
};