const { Op }    = require("sequelize");
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

    model.m_lecturer.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    res.render('layouts/app', {
        ...routes.detail.daftar_nilai[0],
        data: await model.d_classroom.findOne({ 
            attributes: [ 'id', 'name' ],
            include: [
                { 
                    attributes: [ 'id', 'year' ],
                    model: model.m_school_year,
                    required: true,
                },
                { 
                    attributes: [ 'id', 'name' ],
                    model: model.m_study_program,
                    required: true,
                },
                { 
                    attributes: [ 'name', 'step' ],
                    model: model.m_subject,
                    required: true,
                },
                { 
                    attributes: [ 'id' ],
                    model: model.m_lecturer,
                    include: [
                        { 
                            attributes: [ 'name' ],
                            model: model.user,
                        },
                    ],
                },
            ],
            where: { id: req.query.id } 
        }),
        session: req.session,
        routes,
        value_character : helper.value_character,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);
    const count = await model.d_classroom_learner.count({
        where: {
            classroom_id: req.body?.id,
        },
    });

    model.d_classroom_learner.hasOne(model.d_classroom, 
        { 
            sourceKey: 'classroom_id', 
            foreignKey: 'id' 
        }
    );

    model.d_classroom_learner.hasOne(model.m_learner, 
        { 
            sourceKey: 'learner_id', 
            foreignKey: 'id' 
        }
    );

    model.d_classroom_learner.hasOne(model.d_learner_value, 
        { 
            sourceKey: 'id', 
            foreignKey: 'classroom_learner_id' 
        }
    );

    model.m_learner.hasOne(model.m_school_year, 
        { 
            sourceKey: 'school_year_id', 
            foreignKey: 'id' 
        }
    );

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    const results = await model.d_classroom_learner.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
            { 
                attributes: [ 'id', 'subject_id', 'lecturer_id' ],
                model: model.d_classroom,
                required: true,
            },
            { 
                attributes: [ 'id', 'absen', 'tugas', 'midterm', 'sikap', 'final', 'kuis', 'total' ],
                model: model.d_learner_value,
            },
            { 
                attributes: [ 'id', 'nis' ],
                model: model.m_learner,
                required: true,
                include: [
                    { 
                        attributes: [ 'year' ],
                        model: model.m_school_year,
                        required: false,
                    },
                    { 
                        attributes: [ 'name' ],
                        model: model.user,
                        required: true,
                        where: req.body?.search?.value ? 
                        {
                            name: {
                                [Op.like]: '%'+req.body?.search?.value+'%',
                            } 
                        } : {}
                    },
                ],
            },
        ],
        where: {
            classroom_id: req.body?.id,
        },
        order: [
            [model.m_learner, model.user, 'name', 'ASC'],    
        ],
    });

    return helper.datatables(req, res, count, results);
};

module.exports.update_nilai = async function(req, res) {
    helper.auth(req, res);

    try {
        const myform = {
            classroom_learner_id: req.body?.classroom_learner_id,
            classroom_id: req.body?.classroom_id,
            subject_id: req.body?.subject_id,
            lecturer_id: req.body?.lecturer_id,
            learner_id: req.body?.learner_id,
        }

        myform[req.body?.column] = req.body?.value;

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors, validate_label: helper.english_transleted });
        }

        const condition = { classroom_learner_id: myform?.classroom_learner_id }

        const result = await model.d_learner_value
            .findOne({ where: condition })
            .then(function(obj) {
                // update
                if(obj)
                    return obj.update(myform);
                // insert
                return model.d_learner_value.create(myform);
            })

        if(result){
            return res.status(200).json({ message: 'Berhasil di Simpan' })
        }

        throw Error();
        
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};



