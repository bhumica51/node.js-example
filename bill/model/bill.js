var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//  mongoose model
var billListSchema = new Schema({
    userid:
    {
        type: String
    },
    billimage:{
        type: String
    },
	billername: {
        type: String
    },
    billname:{
        type: String
    },
    address:{
        type: String
    },	
    timedate:{
        type: String
    },	
	billprice:{
        type: String
    },	
	useremail:{
        type: String
    },
});
module.exports = mongoose.model('BillDetail',billListSchema);
