/**
 * [Constant contains all the constant property which can be uses frequently.]
 * @type {Object}
 */
var Constant = {
    session: {
        token_expirationtime:3600 * 24,
        expire_session: 'Your session has expired.',    
    },
    bill:
    {
        bill_uploaded:"bill uploaded successfully",
        no_billfound:"No bill found",
    },
    token:
    {
        no_token_provided: 'No token provided',
    },
    error:
    {
        something_wentwrong: 'Something went wrong.',     
    },
    webservicepath:
    {
        commonEP: '/zrm/api/',   
    },
    user:
    {
        no_userfound: 'No user found',   
    }
}
module.exports = Constant
