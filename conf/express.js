var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
module.exports = function expressconfig (app) {
    var router = express.Router()
    app.use(function (req, res, next) {
       res.header("Access-Control-Allow-Origin",'*');
       res.header('Access-Control-Allow-Origin',  "http://20.20.6.84:4200","http://20.20.6.84:8080");
       
           // Request methods you wish to allow
           res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
           
           // Request headers you wish to allow
           res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept , x-access-token");
    
           res.header('Access-Control-Allow-Headers');
           
           // Set to true if you need the website to include cookies in the requests sent
           // to the API (e.g. in case you use sessions)
           //res.header('Access-Control-Allow-Credentials', true);
      next()
    })
    .options('*', function(req, res, next){
      res.end();
     })
     app.use(cors())         
    app.options('*', cors()) // include before other routes 
    
    app.use(bodyParser.json({
      limit: '50mb'
    }))
    app.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true
    }))
    app.use('/', router)
  }
  