const helper    = require('../../helpers');
const model     = require('../../models');
const routes    = require('../../routes/menus/learner');

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    model.m_learner.hasOne(model.m_school_year, 
        { 
            sourceKey: 'school_year_id', 
            foreignKey: 'id' 
        }
    );

    model.m_learner.hasOne(model.m_study_program, 
        { 
            sourceKey: 'study_program_id', 
            foreignKey: 'id' 
        }
    );

    const data = await model.m_learner.findOne({
        include: [
            { 
                attributes: [ 'name', 'email' ],
                model: model.user,
                required: true,
            },
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
        ],
        where: { user_id:  req.session?.id},
    });

    res.render('layouts/app', {
        ...routes[0],
        session: req.session,
        routes,
        data,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};