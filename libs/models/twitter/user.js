// Import Mongoose library
var mongo = require("mongoose");

// Connect to MongoDB
mongo.connect("mongodb://localhost/bigbrother", { useMongoClient: true }, function() {
    mongo.connection.db.dropDatabase();
});

// Create MongoDB Schemas
var user_schema = new mongo.Schema({
    session:String,
    userID:String,
    protected:Boolean,
    protected_icon:String,
    user:String,
    name:String,
    description:String,
    lang:String,
    location:String,
    url:String,
    following:Number,
    followers:Number,
    profile_picture: String
});

// Create MongoDB Models
var twitter_user = mongo.model("twitter_user", user_schema);

// Export Models
module.exports.twitter_user = twitter_user;