var UserDao = require('./../dao/user');
var Session = require('./../../auth/controller/session_guru.js');
var Constant = require('./../../utility/constant.js');

//create user with registration and login
exports.get_userlist = function (req, res, next) {

    UserDao.list_alluser().then(function (user) {
        if (user.length == 0) {
            return res.status(201).send({
                code: 201,
                data: Constant.user.no_userfound,
            })
        }
        else {
            return res.status(200).send({
                code: 200,
                data: user,
            })
        }
    }).catch(function(error){
        return res.status(404).send({
            code: 404,
            message: Constant.error.something_wentwrong
        })
});        
}  


exports.create_user = function (req, res, next) {
    
    UserDao.check_user(req.body.emailid).then(function (user) {

        //register user if user is not there
        console.log("bhumika",!user);
        if(user == false) {
            console.log("bhumika1",user);            
            var userDict = {
                emailid: req.body.emailid,
                name: req.body.name,
                uid: req.body.uid,
                token: "",
            }
            UserDao.register_user(userDict).then(function (user) {
                return res.status(200).send({
                    code: 200,
                    data: user,
                })
            }).catch(function(error){
                return res.status(404).send({
                    code: 404,
                    message: Constant.error.something_wentwrong
                })
            });
        }
        //login user
        else {
            console.log("hello1",req.body.emailid)
            UserDao.login_user(req.body.emailid).then( function (user) {
                return  res.status(200).send({
                        code: 200,
                        data: user,
                    })
                }
            ).catch(function(error) {
                return res.status(404).send({
                code: 404,
                message: Constant.error.something_wentwrong
            }) 
        })
    }
    }).catch(function(error){
        var userDict = {
            emailid: req.body.emailid,
            name: req.body.name,
            uid: req.body.uid,
            token: "",
        }
        UserDao.register_user(userDict).then(function (user) {
            return res.status(200).send({
                code: 200,
                data: user,
            })
        }).catch(function(error){
            return res.status(404).send({
                code: 404,
                message: Constant.error.something_wentwrong
            })
        });
    })
};

