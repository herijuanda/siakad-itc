const { Op }    = require("sequelize");
const helper    = require('../../../helpers');
const form      = require('../../../helpers/form');
const model     = require('../../../models');
const routes    = require('../../../routes/menus/admin');

module.exports.index = async function(req, res) {
    res.render('layouts/app', {
        ...routes[2].sub[2],
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    const sequelizeDatatable = require('node-sequelize-datatable'); 
    
    const datatableObj = await sequelizeDatatable(req.body);
    const count = await model.user.count();

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    model.m_learner.hasOne(model.m_study_program, 
        { 
            sourceKey: 'study_program_id', 
            foreignKey: 'id' 
        }
    );

    const results = await model.m_learner.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        attributes: [ 'id', 'register_number' ],
        include: [
            { 
                attributes: [ 'name', 'email' ],
                model: model.user,
                required: true,
            },
            { 
                attributes: [ 'name' ],
                model: model.m_study_program,
                required: true,
            },
        ],
    });

    return helper.datatables(req, res, count, results);
};