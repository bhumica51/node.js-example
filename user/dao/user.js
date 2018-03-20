var UserModel = require('./../model/user.js');

var jwt = require('jsonwebtoken');
var Constant = require('./../../utility/constant');
var Session = require('./../../auth/controller/session_guru.js');
var datetime = new Date();



exports.list_alluser = function () {
    return new Promise( function( resolve, reject ) { 
         UserModel.find({}, function (err, user) {
        if ( err ) {
            reject( err ) ; // Failure
          }
          else{
            console.log("user",user)            
            resolve( user ) ; // Success 
          }
        });
    });
};

//check user and register or login with token
exports.check_user = function (emailid) {
    return new Promise( function( resolve, reject ) { 
        console.log("emailid",emailid)
         UserModel.find({ emailid: emailid }, function (err, user) {
        if ( err ) {
            reject( err ) ; // Failure
          }
          else{
            console.log("user",user)            
            resolve( user ) ; // Success 
          }
        });
    });
};

exports.register_user = function (userDict) {

    return new Promise( function( resolve, reject ) { 
      token = Session.create_webservicetoken(userDict.email)
        userDict.token = token;
        var new_user = new UserModel(userDict);
        new_user.save({}, function (err, user) {
            if ( err ) {
                reject( err ) ; // Failure
            }
            else{
                resolve( user ) ; // Success    
            }    
        });
    });
};

exports.login_user = function (emailid, callback) {

    return new Promise( function( resolve, reject ) {         
        diffc = new Date().getTime() - datetime.getTime();
        days = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
        if (days < 3) {
            UserModel.findOne({ emailid: emailid}, function (err, user) {
                if ( err ) {
                    reject( err ) ; // Failure
                }
                else{
                    resolve( user ) ; // Success     
                }      
            });
        }
        else {
            token = Session.create_webservicetoken(emailid)        
            UserModel.findOneAndUpdate({ emailid:emailid }, { $set: { token: token } },{new: true}, function (err, user) {
                if ( err ) {
                    reject( err ) ; // Failure
                }
                else{
                    resolve( user ) ; // Success    
                } 
            });
        }
    });
};





