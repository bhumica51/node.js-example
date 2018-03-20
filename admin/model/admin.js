var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose model
var adminSchema = new Schema({
    emailid:
    {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    ct: {
        type: Number,
        default: new Date().getTime()
    },
});
module.exports = mongoose.model('Admin', adminSchema);