const helper    = require('../../helpers');
const model     = require('../../models');
const routes    = require('../../routes/menus/mentor');

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    model.m_mentor.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    const data = await model.m_mentor.findOne({
        include: [
            { 
                attributes: [ 'name', 'email' ],
                model: model.user,
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