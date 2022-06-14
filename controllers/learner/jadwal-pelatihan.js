// const { Op }    = require("sequelize");
const helper    = require('../../helpers');
// const form      = require('../../../helpers/form');
const model     = require('../../models');
const routes    = require('../../routes/menus/learner');
const moment    = require('moment');  
// const { body, validationResult } = require('express-validator');

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    model.d_classroom_timetable.hasOne(model.m_day, 
        { 
            sourceKey: 'day_id', 
            foreignKey: 'id' 
        }
    );

    model.d_classroom_timetable.hasOne(model.d_classroom, 
        { 
            sourceKey: 'classroom_id', 
            foreignKey: 'id' 
        }
    );

    model.d_classroom.hasMany(model.d_classroom_learner, 
        { 
            sourceKey: 'id', 
            foreignKey: 'classroom_id' 
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

    model.m_lecturer.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    const data = await model.d_classroom_timetable.findAll({
        attributes: [ 'time_first', 'time_last', 'room' ],
        include: [
            { 
                attributes: [ 'indonesian' ],
                model: model.m_day,
                required: true,
            },
            { 
                attributes: [ 'code', 'name' ],
                model: model.d_classroom,
                required: true,
                include: [
                    { 
                        attributes: [ 'name' ],
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
                        attributes: [],
                        model: model.d_classroom_learner,
                        required: true,
                        where: { 
                            learner_id:  req.session?.learner_id
                        },
                    },
                ],
            },
        ],
        order: [
            ['day_id', 'ASC'],
            ['time_first', 'ASC'],
        ],
    });

    res.render('layouts/app', {
        ...routes[1],
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
        data,
        moment : moment,
    });
};
