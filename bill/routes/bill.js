module.exports = function (app) {

    var Bill = require('./../controller/bill.js');
    var Session = require('./../../auth/controller/session_guru.js');
    var constants = require('./../../utility/constant.js');

    app.route(constants.webservicepath.commonEP + 'addbill')
        .post(Session.issession_live, Bill.add_billdetails);
    app.route(constants.webservicepath.commonEP +'billlist')
        .get(Session.issession_live, Bill.bill_list);
    app.route(constants.webservicepath.commonEP + 'billdetails')
        .post(Session.issession_live, Bill.bill_detail);
    app.route(constants.webservicepath.commonEP + 'userbilllist')
        .post(Session.issession_live, Bill.admin_billlist);
        
}