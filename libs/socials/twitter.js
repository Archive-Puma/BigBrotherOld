var Twitter = require("./tokens").Twitter;

// Schema 
var twitter_user = require("../models/twitter/user").twitter_user;

// Functions
function twitter_search(session_id, name) {
    Twitter.get("users/search", {
        "q": name,
        count: 5
    }, function(error,data,res) {
        for(var profile in data) {
            var lock = "lock_open";
            if(data[profile]['protected'])
                lock = "lock";
            // Fill user information
            var user = new twitter_user({
                session: session_id,
                userID:data[profile]['id_str'],
                user:data[profile]['screen_name'],
                name:data[profile]['name'],
                location:data[profile]['location'],
                description:data[profile]['description'],
                url:data[profile]['url'],
                protected:data[profile]['protected'],
                protected_icon:lock,
                following:data[profile]['friends_count'],
                followers:data[profile]['followers_count'],
                lang:data[profile]['lang'],
                profile_picture:data[profile]['profile_image_url_https']
            });
            // Save user info in database
            user.save(function(error) {
                if(!error) {
                    return;
                } else {
                    response.render(error);
                }
            });
        }
        return;
    });
    return;
};

module.exports.twitter_search = twitter_search;