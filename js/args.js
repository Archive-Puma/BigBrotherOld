// Parse the params
function parser(request) {
    var params;

    if(request.url.indexOf("?") > 0) { 
        params = request.url.split("?")[1].split("&");
        console.log(params);
    };

    return params;
};

module.exports.parser = parser;