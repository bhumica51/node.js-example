var BillDao = require('./../dao/bill');
var Session = require('./../../auth/controller/session_guru.js');
var Constant = require('./../../utility/constant.js');


//google drive 
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var billDict = [];
var fileid;
var base64ToImage = require('base64-to-image');
var path = require("path");


var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
//add bill

exports.add_billdetails = function (req, res) {

    billDict = {
        userid: req.body.userid,
        billimage: req.body.billimage,
        billername: req.body.billername,
        billname: req.body.billname,
        address: req.body.address,
        timedate: req.body.timedate,
        billprice: req.body.billprice,
        useremail: req.body.useremail,
    }
    
    base64toImage();

    BillDao.create_bill(billDict).then(function (bill) {
        return res.status(200).send({
            code: 200,
            data: Constant.bill.bill_uploaded,
        })
    }).catch(function(error){
        return res.status(404).send({
            code: 404,
            message: Constant.error.something_wentwrong
        })
    }); 
};
function base64toImage (req, res)
{
//convert base 64 to iamge
        var buff = new Buffer(billDict.billimage.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
        var newPath = path.join(__dirname, '../..', 'image/') + billDict.billname + ".png";
        fs.writeFile(newPath, buff, function (err) {
            console.log('done');
        });

        fs.readFile('client_secret.json', function processClientSecrets(err, content) {
            if (err) {
              console.log('Error loading client secret file: ' + err);
              return;
            }
            else
            {
                authorize(JSON.parse(content), listFiles);
            }
            // Authorize a client with the loaded credentials, then call the
            // Drive API.
          });
}
//get bill list
exports.bill_list = function (req, res) {
    BillDao.getbiill_list().then(function (billlist) {
        console.log("hello", billlist.length)
        if (billlist.length == 0) {
            return res.status(201).send({
                code: 201,
                data: Constant.bill.no_billfound,
            })
        }
        else {
            return res.status(200).send({
                code: 200,
                data: billlist,
            })
        }
    }, function (err) {
        return res.status(404).send({
            code: 404,
            message: Constant.error.something_wentwrong
        })
    });
};

//get bill details
exports.bill_detail = function (req, res) {
    BillDao.get_billdetail(req.body.userid).then(function (billdetail) {
        return res.status(200).send({
            code: 200,
            data: billdetail,
        })
    }, function (err) {
        return res.status(404).send({
            code: 404,
            message: Constant.bill.no_billfound
        })
    });
};

//get bill details
exports.admin_billlist = function (req, res) {

    console.log("req.body.useremail", req.body.useremail)    
    
    BillDao.get_adminbilldetail(req.body.useremail).then(function (billdetail) {
        console.log("billist", billdetail)    
        
        if (billdetail.length == 0) {
            return res.status(201).send({
                code: 201,
                data: Constant.bill.no_billfound,
            })
        }
        else {
            return res.status(200).send({
                code: 200,
                data: billdetail,
            })
        }
    }, function (err) {
        return res.status(404).send({
            code: 404,
            message: Constant.bill.no_billfound
        })
    });
};

// function for uploading file to google drive
function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            console.log('Error while trying to retrieve access token', JSON.parse(token));
            callback(oauth2Client);
        }
    });
}


function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            console.log('Error while trying to retrieve access token', oauth2Client.credentials);
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
  @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */


function listFiles(auth) {
    var drive = google.drive({ version: 'v3' });

    drive.files.create({
        resource: {
            name: billDict.billname + ".png",
            mimeType: 'image/png',
            parents: ["1hWVO70cJRnBk-_HS9p7kg7Q0JjUw2jdW"]
        },
        media: {
            mimeType: 'image/png',
            body: fs.createReadStream(path.join(__dirname, '../..', 'image/') + billDict.billname + ".png") // read streams are awesome!
        },
        auth: auth
    }, function (err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            fileid= file.id;
            console.log('File Id: ',fileid);

        }
    });
}