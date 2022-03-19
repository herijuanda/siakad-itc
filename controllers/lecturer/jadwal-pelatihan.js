// const { Op }    = require("sequelize");
const helper    = require('../../helpers');
// const form      = require('../../../helpers/form');
const model     = require('../../models');
const routes    = require('../../routes/menus/lecturer');
// const { body, validationResult } = require('express-validator');

module.exports.index = async function(req, res) {
    helper.auth(req, res);
    res.render('layouts/app', {
        ...routes[1],
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};
