
var AdminModel = require('./../model/admin.js');
var jwt = require('jsonwebtoken');
var Constant = require('./../../utility/constant');
var Session = require('./../../auth/controller/session_guru.js');
var datetime = new Date();

 var days = 0;

exports.admin_login = function (emailid,password) {

    console.log("emailid",emailid)
    
    return new Promise(function (resolve, reject) {

        AdminModel.findOne({ emailid: emailid, password: password }, function (err, admin) {
            if (err) {
            }
            else {
                console.log("admin ct",admin.ct)    
                diffc = new Date().getTime() - admin.ct;
                console.log("diffc",diffc)
                
                days = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
                console.log("days",days)
                                
            }
        });

        
        if (days < 3) {
            console.log("emailid",emailid)
            console.log("password",password)
            
            AdminModel.findOne({ emailid: emailid, password: password }, function (err, admin) {
                if (err) {
                    reject(err); // Failure
                }
                else {
                    console.log("old",admin)                    
                    resolve(admin); // Success     
                }
            });
        }
        else {
            token = Session.create_webservicetoken(emailid)
            console.log("token",token)                       
            AdminModel.findOneAndUpdate({ emailid: emailid, password: password }, { $set: { token: token } },{new: true}, function (err, admin) {
                if (err) {
                    reject(err); // Failure
                }
                else {
                    console.log("admin",admin)                                           
                    resolve(admin); // Success    
                }
            });
        }
    });
};

exports.register_admin = function (adminDict) {

    return new Promise(function (resolve, reject) {

        AdminModel.findOne({ emailid: adminDict.emailid, password: adminDict.password }, function (err, admin) {
            if (err) {
                reject(err); // Failure
            }
            else {
                console.log("admin",admin)
                if (admin == null) {
                        token = Session.create_webservicetoken(adminDict.email)
                        adminDict.token = token;
                        var new_admin = new AdminModel(adminDict);
                        new_admin.save({}, function (err, admin) {
                            if (err) {
                            }
                            else {
                                console.log("new admin",admin)     
                                resolve(admin); // Success    
                            }
                        }); 
                    
                }
                else {
                    console.log("old admin",admin)
                    
                    resolve(admin); // Success    

                }
            }
        });
    });
};

