// Import Twit library
var Twitter = require("twit");

// Set keys and tokens
var T = new Twitter({
    consumer_key:         'H54twKyiED5NrHmqrDI1HtKFv',
    consumer_secret:      'zPL3MU5eAJSO5N7WKdqvuXHUyF8euYGxEb1g5Bd1k7rjqzIKP7',
    access_token:         '832570595917316097-svywXbVnQK1rcznLkqN69MTzAYwH0Zj',
    access_token_secret:  'YftzBi3ZjFJxDb2myjwiyi6ntBl7qiJAvQCC57AjabGEN',
});

module.exports.Twitter = T;