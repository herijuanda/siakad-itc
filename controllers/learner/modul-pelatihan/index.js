// const { Op }    = require("sequelize");
// const { sequelize }    = require("sequelize");
const helper        = require('../../../helpers');
// const form      = require('../../../helpers/form');
const model         = require('../../../models');
const routes        = require('../../../routes/menus/learner');
const datatables    = require('node-sequelize-datatable'); 

// const moment    = require('moment');  
// const { body, validationResult } = require('express-validator');

module.exports.index = async function(req, res) {
    helper.auth(req, res);
    res.render('layouts/app', {
        ...routes[4],
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

    model.m_lecturer.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    model.d_classroom.hasMany(model.d_classroom_learner, 
        { 
            sourceKey: 'id', 
            foreignKey: 'classroom_id' 
        }
    );
    
    const datatableObj = await datatables(req.body);
    const count = await model.d_classroom.count({
        include: [
            { 
                attributes: [],
                model: model.d_classroom_learner,
                required: true,
                where: { 
                    learner_id:  req.session?.learner_id
                },
            }
        ],
    });

    const results = await model.d_classroom.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
            { 
                attributes: [ 'id', 'name' ],
                model: model.m_subject,
                required: true,
            },
            { 
                attributes: [ 'id' ],
                model: model.m_lecturer,
                required: true,
                include: [
                    { 
                        attributes: [ 'name' ],
                        model: model.user,
                        required: true,
                    },
                ],
            },
            { 
                attributes: [ 'id' ],
                model: model.d_classroom_learner,
                required: true,
                where: { 
                    learner_id:  req.session?.learner_id
                },
            }
        ],
        order: [
            // [model.m_subject, 'name', 'ASC'],
            ['name', 'ASC'],
        ],
    });

    return helper.datatables(req, res, count, results);
};