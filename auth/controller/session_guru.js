var jwt = require('jsonwebtoken'); 
var Constant = require('../../utility/constant.js')
var JWT_KEY = 'zrm'
var token;

//check the token is expired or not
exports.issession_live = function(req, res, next) {
    token = req.headers['x-access-token'];
  if (!token) 
    return res.status(403).send({ 
      code: 403,
       message: Constant.token.no_token_provided
       });

  jwt.verify(token, JWT_KEY, function(err, decoded) {      
    if (err)
        return res.status(401).send({ 
            code: 401,
          message: Constant.session.expire_session 
        });
      req.userId = decoded.id;
      next();
  }); 

}

//create token
exports.create_webservicetoken = function(userdata) {
    var token = jwt.sign({
        user: userdata
      }, JWT_KEY, {
        'expiresIn': Constant.session.token_expirationtime
      })
      return token
}
