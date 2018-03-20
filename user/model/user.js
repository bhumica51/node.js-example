var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose model
var UserSchema = new Schema({
    emailid:
    {
        type: String
    },
    name: {
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
module.exports = mongoose.model('User', UserSchema);
