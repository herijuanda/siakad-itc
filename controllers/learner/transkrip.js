// const { Op }    = require("sequelize");
const helper    = require('../../helpers');
// const form      = require('../../../helpers/form');
const model     = require('../../models');
const routes    = require('../../routes/menus/learner');
// const { body, validationResult } = require('express-validator');

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    model.d_classroom.hasOne(model.m_subject, 
        { 
            sourceKey: 'subject_id', 
            foreignKey: 'id' 
        }
    );

    model.m_lecturer.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    model.d_classroom.hasOne(model.d_classroom_learner, 
        { 
            sourceKey: 'id', 
            foreignKey: 'classroom_id' 
        }
    );

    model.d_classroom_learner.hasOne(model.d_learner_value, 
        { 
            sourceKey: 'id', 
            foreignKey: 'classroom_learner_id' 
        }
    );

    const data = await model.d_classroom.findAll({
        attributes: [ 'id' ],
        include: [
            { 
                attributes: [ 'name', 'step' ],
                model: model.m_subject,
                required: true,
            },
            { 
                attributes: [ 'id' ],
                model: model.d_classroom_learner,
                required: true,
                where: { 
                    learner_id:  req.session?.learner_id
                },
                include: [
                    { 
                        attributes: [ 'id', 'total' ],
                        model: model.d_learner_value,
                        required: false,
                    },
                ],
            },
        ],
        where: { 
            actived: 1,
        },
        order: [
            [model.m_subject, 'step', 'ASC'],
            [model.m_subject, 'name', 'ASC'],
        ],
    });
    
    res.render('layouts/app', {
        ...routes[3],
        session : req.session,
        routes,
        data,
        value_character : helper.value_character,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.detail = async function(req, res) {
    helper.auth(req, res);

    if(!req.body?.id){
        return res.status(422).json({ errors: 'Foto kegiatan belum di upload' });
    }

    model.d_learner_value.hasOne(model.m_subject, 
        { 
            sourceKey: 'subject_id', 
            foreignKey: 'id' 
        }
    );

    const data = await model.d_learner_value.findOne({
        attributes: [ 'id', 'absen', 'tugas', 'midterm', 'sikap', 'final', 'kuis', 'total' ],
        include: [
            { 
                attributes: [ 'name' ],
                model: model.m_subject,
                required: true,
            },
        ],
        where: { id: req.body.id },
    });

    res.render('pages/'+req?.body?.path+'/detail', {
        data,
    });
};
