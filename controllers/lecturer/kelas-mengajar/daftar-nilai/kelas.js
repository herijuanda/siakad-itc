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
        ...routes[2].sub[0],
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);

    model.d_classroom.hasOne(model.m_school_year, 
        { 
            sourceKey: 'school_year_id', 
            foreignKey: 'id' 
        }
    );

    model.d_classroom.hasOne(model.m_study_program, 
        { 
            sourceKey: 'study_program_id', 
            foreignKey: 'id' 
        }
    );

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
        attributes: [
            'id',
            'name',
            [
                model.sequelize.literal(`(
                    SELECT COUNT(learner.id) 
                    FROM d_classroom_learners AS learner 
                    WHERE 
                        learner.classroom_id = d_classroom.id
                )`),
                'learner_count'
            ]
        ],
        include: [
            { 
                attributes: [ 'year' ],
                model: model.m_school_year,
                required: true,
            },
            { 
                attributes: [ 'name' ],
                model: model.m_study_program,
                required: true,
            },
            { 
                attributes: [ 'name', 'step' ],
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
            [model.m_school_year, 'id', 'ASC'],
            [model.m_study_program, 'id', 'ASC'],
            [model.m_subject, 'step', 'ASC'],
            [model.m_subject, 'id', 'ASC'],
            ['name', 'ASC'],
        ],
        where: { 
            actived: 1,
        },
    });

    return helper.datatables(req, res, count, results);
};



