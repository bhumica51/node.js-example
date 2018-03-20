module.exports = function (app) {
    
      var Admin = require('./../controller/admin.js');
      var Session = require('./../../auth/controller/session_guru.js');
      var constants = require('./../../utility/constant.js');
      var cors = require('cors')
      
      app.route(constants.webservicepath.commonEP + 'adminlogin')
        .post(Admin.create_admin,Admin.login_admin,cors());

    }