const helper    = require('../../helpers');
const form      = require('../../helpers/form');
const model     = require('../../models');
const routes    = require('../../routes/menus/learner');
const moment    = require('moment');  

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    model.d_payment.hasOne(model.m_learner, 
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

    model.m_learner.hasOne(model.m_study_program, 
        { 
            sourceKey: 'study_program_id', 
            foreignKey: 'id' 
        }
    );

    const data = await model.d_payment.findAll({
        attributes: [ 'datetime', 'value', 'description' ],
        include: [
            { 
                attributes: [],
                model: model.m_learner,
                include: [
                    { 
                        attributes: [],
                        model: model.user,
                        required: true,
                        where: { 
                            id:  req.session?.id
                        },
                    },
                ],
            },
        ],
        order: [
            ['createdAt', 'DESC'],
        ],
    });

    res.render('layouts/app', {
        ...routes[2],
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
        form,
        data,
        learner_cost: await model.m_learner.findOne(
            {
                attributes: [],
                include: [
                    { 
                        attributes: [ 'cost' ],
                        model: model.m_study_program,
                        required: true,
                    },
                    { 
                        attributes: [],
                        model: model.user,
                        required: true,
                        where: { 
                            id:  req.session?.id
                        },
                    },
                ],
            }
        ),
        learner_payment: await model.d_payment.sum( 'value',
            {
                include: [
                    { 
                        attributes: [],
                        model: model.m_learner,
                        include: [
                            { 
                                attributes: [],
                                model: model.user,
                                required: true,
                                where: { 
                                    id:  req.session?.id
                                },
                            },
                        ],
                    },
                ],
            }
        ),
        moment: moment,
    });
};
