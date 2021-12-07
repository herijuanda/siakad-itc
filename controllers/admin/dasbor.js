const helper    = require('../../helpers');
const model     = require('../../models');
const routes    = require('../../routes/menus/admin');

module.exports.index = function(req, res) {
    helper.auth(req, res);
    res.render('layouts/app', {
        ...routes[0],
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};