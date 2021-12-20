const { Op }    = require("sequelize");
const helper    = require('../../../helpers');
const form      = require('../../../helpers/form');
const model     = require('../../../models');
const routes    = require('../../../routes/menus/admin');

module.exports.index = async function(req, res) {
    res.render('layouts/app', {
        ...routes[2].sub[1],
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    console.log(req)
    const sequelizeDatatable = require('node-sequelize-datatable'); 
    // const datatable = require('sequelize-datatables');
    
    const datatableObj = await sequelizeDatatable(req.body);
    const count = await model.user.count();
    
    model.user.hasOne(model.role, { foreignKey: 'id' });
    const results = await model.user.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
            { 
                attributes: [ 'id' ],
                model: model.role,
                where: { slug: 'peserta-didik' },
                // required: false,
            },
        ],
        // where: {
        //     role_id: 4,
        // },
        // where: {
        //     role_id : {
        //         [Op.not]: 1,
        //     }
        // }
    });

    return helper.datatables(req, res, count, results);
};