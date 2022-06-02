// const { Op }    = require("sequelize");
// const { sequelize }    = require("sequelize");
const helper        = require('../../../../helpers');
// const form      = require('../../../helpers/form');
const model         = require('../../../../models');
const routes        = require('../../../../routes/menus/lecturer');
const datatables    = require('node-sequelize-datatable'); 
// const moment    = require('moment');  
// const { body, validationResult } = require('express-validator');

module.exports.index = async function(req, res) {
    helper.auth(req, res);
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

    model.d_classroom.hasOne(model.m_subject, 
        { 
            sourceKey: 'subject_id', 
            foreignKey: 'id' 
        }
    );

    model.d_classroom.hasOne(model.m_lecturer, 
        { 
            sourceKey: 'lecturer_id', 
            foreignKey: 'id' 
        }
    );
    
    const datatableObj = await datatables(req.body);
    const count = await model.d_classroom.count();
    const results = await model.d_classroom.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
            { 
                attributes: [ 'id', 'name' ],
                model: model.m_subject,
                required: true,
            },
            { 
                attributes: [],
                model: model.m_lecturer,
                required: true,
                where: { 
                    id:  req.session?.lecturer_id
                },
            },
        ],
        order: [
            [model.m_subject, 'name', 'ASC'],
            ['name', 'ASC'],
        ],
        group: 'subject_id',
    });

    return helper.datatables(req, res, count, results);
};



