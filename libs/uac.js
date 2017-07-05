var twitter_user = require("./models/twitter/user").twitter_user;

module.exports = function(request, response, next) {
    if(!request.session.user) {
        response.redirect("/");
    } else {
        twitter_user.find({ session:request.session.user }, function(error, document) {
            if(error) {
                console.log(error);
                response.redirect("/");
            } else {
                console.log(document);
                next();
            }
        });
    }
};