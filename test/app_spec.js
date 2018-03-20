
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App', function() {
  describe('/set?somekey=somevalue', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .post('/set?somekey=somevalue')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('http://20.20.6.84:4200/', function() {
    it('saves a new task', function(done) {
            request(app)
            . post('http://20.20.6.84:4200/zrm/api/adminlogin')
            .send({ emailid: "admin@zymr.com",
            password: "password",
            token : "" })
            .expect(201)
            .end(function(err, res) {
                done(err);
            });
    });
});