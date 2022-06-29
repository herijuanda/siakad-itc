const { Op }        = require("sequelize");
const helper        = require('../../helpers');
const form          = require('../../helpers/form');
const model         = require('../../models');
const routes        = require('../../routes/menus/mentor');
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

    const data = await model.d_mentoring.findOne({
        attributes: [ 'id' ],
        include: [
            { 
                attributes: [ 'agency', 'position' ],
                model: model.m_mentor,
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
        where: { 
            mentor_id:  req.session?.mentor_id
        },
    });

    res.render('layouts/app', {
        ...routes[1],
        session : req.session,
        data,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);

    const count = await model.d_logbook.count({
        where: {
            mentoring_id: req.body?.mentoring_id,
        },
    });

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
        where: {
            mentoring_id: req.body?.mentoring_id,
        },
        order: [
            ['id', 'DESC'],    
        ],
    });

    return helper.datatables(req, res, count, results);
};

module.exports.approval = async function(req, res) {
    helper.auth(req, res);

    try {
        const id = req.body?.id;
        const approval = req.body?.approval;

        const result = await model.d_logbook.update({ status: approval }, {
            where: {
                id: id
            }
        });

        if(result){
            return res.status(200).json({ message: 'Berhasil di Update' })
        }

        throw Error();
        
    } catch (error) {
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};

module.exports.update_score = async function(req, res) {
    helper.auth(req, res);

    try {
        console.log('haiii', req?.body);

        const result = await model.d_logbook.update({ score: req?.body?.value }, {
            where: {
                id: req?.body?.id
            }
        });

        if(result){
            return res.status(200).json({ message: 'Berhasil di Simpan' })
        }

        throw Error();
        
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};