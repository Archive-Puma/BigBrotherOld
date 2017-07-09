// Import Twit library
var T = require("twit");

// Set keys and tokens
var Twitter = new T({
    consumer_key:         'H54twKyiED5NrHmqrDI1HtKFv',
    consumer_secret:      'zPL3MU5eAJSO5N7WKdqvuXHUyF8euYGxEb1g5Bd1k7rjqzIKP7',
    access_token:         '832570595917316097-svywXbVnQK1rcznLkqN69MTzAYwH0Zj',
    access_token_secret:  'YftzBi3ZjFJxDb2myjwiyi6ntBl7qiJAvQCC57AjabGEN',
});

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

module.exports.Twitter = T;
module.exports.twitter_search = twitter_search;