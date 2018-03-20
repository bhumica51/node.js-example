var adminDao = require('./../dao/admin');
var Session = require('./../../auth/controller/session_guru.js');
var Constant = require('./../../utility/constant.js');

exports.create_admin = function (req, res, next) {
    var adminDict = {
        emailid: "admin@zymr.com",
        password: "password",
        token: ""
    }

    adminDao.register_admin(adminDict).then(function (admin) {
        console.log("bhumika",admin);        
            next();        
    }).catch(function (error) {
        return res.status(404).send({
            code: 404,
            message: Constant.error.something_wentwrong
        })
    });
};

exports.login_admin = function (req, res, next) {

    console.log("hello1", req.body.emailid)
    adminDao.admin_login(req.body.emailid, req.body.password).then(function (admin) {
        if(admin == null)
        {
            return res.status(201).send({
                code: 201,
                data:"Please insert correct login credential" ,
            })
        }
        else
        {
            return res.status(200).send({
                code: 200,
                data: admin,
            })
        }
        
    }
    ).catch(function (error) {
        return res.status(404).send({
            code: 404,
            message: Constant.error.something_wentwrong
        })
    })
};
