var billModel = require('./../model/bill.js');
var jwt = require('jsonwebtoken');
var Constant = require('./../../utility/constant');
var Session = require('./../../auth/controller/session_guru.js');
var q = require('q');

//add bill list detials into database
exports.create_bill = function (billDict) {
    
    return new Promise(function (resolve, reject) {
        
        var new_user = new billModel(billDict);
        new_user.save({}, function (err, bill) {
            if (err) {
                reject(err); // Failure
            }
            else {
                resolve(bill); // Success
            }
        });
    });
   
}



//get bill list from database
exports.getbiill_list = function () {
 
    return new Promise(function (resolve, reject) {
        billModel.find({}, function (err, bill) {
                if (err) {
                    reject(err); // Failure
                }
                else {
                    console.log("bill",bill) // Success                    
                    resolve(bill);
                }
        });
    });
};

//get bill details from database
exports.get_billdetail = function (userid) {

    return new Promise(function (resolve, reject) {
        billModel.find({userid:userid}, function (err, bill) {
                if (err) {
                    reject(err); // Failure
                }
                else {
                    resolve(bill); // Succes
                }
        });
    });
};

exports.get_adminbilldetail = function (emailid) {
    
        return new Promise(function (resolve, reject) {
            console.log("bill",emailid) // Success                                
            billModel.find({useremail:emailid}, function (err, bill) {
                    if (err) {
                        reject(err); // Failure
                    }
                    else {
                        resolve(bill); // Succes
                    }
            });
        });
    };
    
