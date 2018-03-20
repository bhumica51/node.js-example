
module.exports = function routeconfig(app) {
    require('./../user/routes/user')(app);
    require('./../bill/routes/bill')(app);
    require('./../admin/routes/admin')(app);
    
};