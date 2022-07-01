const { Op }        = require("sequelize");
const helper        = require('../../helpers');
const model         = require('../../models');
const routes        = require('../../routes/menus/lecturer');
const datatables    = require('node-sequelize-datatable'); 
// const moment        = require('moment');

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    model.d_mentoring.hasOne(model.m_mentor, 
        { 
            sourceKey: 'mentor_id', 
            foreignKey: 'id' 
        }
    );

    model.m_mentor.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    res.render('layouts/app', {
        ...routes[4],
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);

    const count = await model.d_logbook.count();

    model.d_logbook.hasOne(model.d_mentoring, 
        { 
            sourceKey: 'mentoring_id', 
            foreignKey: 'id' 
        }
    );

    model.d_mentoring.hasOne(model.m_learner, 
        { 
            sourceKey: 'learner_id', 
            foreignKey: 'id' 
        }
    );

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    const results = await model.d_logbook.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        attributes: [ 
            'id', 
            'date', 
            'time_in', 
            'time_out', 
            'event', 
            'problem', 
            'file', 
            'note', 
            'status', 
            'score'
        ],
        include: [
            { 
                attributes: [ 'id' ],
                model: model.d_mentoring,
                required: true,
                include: [
                    { 
                        attributes: [ 'id' ],
                        model: model.m_learner,
                        required: true,
                        include: [
                            { 
                                attributes: [ 'name'  ],
                                model: model.user,
                                required: true,
                            },
                        ],
                    },
                ],
            },
        ],
        order: [
            ['id', 'DESC'],    
        ],
    });

    return helper.datatables(req, res, count, results);
};