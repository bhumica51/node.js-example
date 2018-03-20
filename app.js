var express = require('express');
var app = express();

require('./conf/express.js')(app);
require('./utility/config.js').doConnectWithMongoDB();
require('./conf/route_initilization.js')(app);
var server = app.listen(process.env.port || 4200, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});

module.exports = server;