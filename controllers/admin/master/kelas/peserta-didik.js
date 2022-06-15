const { Op }        = require("sequelize");
const helper        = require('../../../../helpers');
const form          = require('../../../../helpers/form');
const model         = require('../../../../models');
const routes        = require('../../../../routes/menus/admin');
const datatables    = require('node-sequelize-datatable'); 

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
        ...routes.detail.kelas[0],
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
        session : req.session,
        routes,
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
    
    model.d_classroom_learner.hasOne(model.m_learner, 
        { 
            sourceKey: 'learner_id', 
            foreignKey: 'id' 
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

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    let data = {};
    let learner_value = {};

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    res.render('pages/'+req?.body?.path+'/form', {
        classroom_id: req?.body?.classroom_id,
        learner: await model.m_learner.findAll({
            attributes: [ 'id', 'nis' ],
            include: [
                { 
                    attributes: [ 'name' ],
                    model: model.user,
                    required: true,
                },
            ],
            where: {
                school_year_id: req.body?.school_year_id,
                study_program_id: req.body?.study_program_id,
            }
        }),
        learner_value,
        form,
        data,
        // role_value
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);

    try {
        const id = req.body?.myform_hide?.id;
        const myform = {
            ...req.body?.myform,
            classroom_id: req.body?.myform_hide?.classroom_id,
        };

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        const learner_exist = await model.d_classroom_learner.count(
                                        { 
                                            where: { 
                                                classroom_id: myform?.classroom_id,
                                                learner_id: myform?.learner_id 
                                            } 
                                        }
                                    );
            
        if(learner_exist > 0){
            return res.status(422).json({ errors: 'Telah Terdaftar di Kelas ini.' });
        }

        const result = await model.d_classroom_learner.create(myform);

        if(result){
            return res.status(200).json({ message: 'Berhasil di Simpan' })
        }

        throw Error();
        
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};

module.exports.delete = async function(req, res) {
    helper.auth(req, res);

    try {
        const id = req.body?.id;

        const result = await model.d_classroom_learner.destroy({
            where: {
                id: id
            }
        });

        if(result){
            return res.status(200).json({ message: 'Berhasil di Hapus' })
        }

        throw Error();
        
    } catch (error) {
        res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};