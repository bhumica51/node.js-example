module.exports = function (app) {
    
      var User = require('./../controller/user.js');
      var Session = require('./../../auth/controller/session_guru.js');
      var constants = require('./../../utility/constant.js');
      var cors = require('cors')
      
      app.route(constants.webservicepath.commonEP + 'register')
        .post(User.create_user,cors());

    app.route(constants.webservicepath.commonEP + 'userlist')
        .get(Session.issession_live,User.get_userlist,cors());
    }