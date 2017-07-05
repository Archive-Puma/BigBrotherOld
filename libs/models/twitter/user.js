// Import Mongoose library
var mongo = require("mongoose");

// Connect to MongoDB
mongo.connect("mongodb://localhost/bigbrother", { useMongoClient: true });

// Create MongoDB Schemas
var user_schema = new mongo.Schema({
    userID:String,
    protected:Boolean,
    user:String,
    name:String,
    description:String,
    lang:String,
    location:String,
    url:String,
    following:Number,
    followers:Number
});

// Create MongoDB Models
var twitter_user = mongo.model("twitter_user", user_schema);

// Export Models
module.exports.twitter_user = twitter_user;