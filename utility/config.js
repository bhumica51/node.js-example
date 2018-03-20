mongoose = require('mongoose');
    
exports.doConnectWithMongoDB = function() {
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/DB-ZRM')
}