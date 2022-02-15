const { Op }    = require("sequelize");
const helper    = require('../../../helpers');
const form      = require('../../../helpers/form');
const model     = require('../../../models');
const routes    = require('../../../routes/menus/admin');
// const { body, validationResult } = require('express-validator');

module.exports.index = async function(req, res) {
    helper.auth(req, res);
    res.render('layouts/app', {
        ...routes[1].sub[2],
        form,
        school_year: await model.m_school_year.findAll({ attributes: ['id', ['year', 'name']] }),
        study_program: await model.m_study_program.findAll(),
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    const sequelizeDatatable = require('node-sequelize-datatable'); 
    // const datatable = require('sequelize-datatables');
    
    const datatableObj = await sequelizeDatatable(req.body);
    // const count = await model.study_program.count();
    const count = await model.m_study_program.count();
    
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
    const results = await model.d_classroom.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
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
        order: [
            ['name', 'ASC'],
        ],
        where: {
            actived: 1,
        },
        // where: {
        //     role_id : {
        //         [Op.not]: 1,
        //     }
        // }
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    let data = {};
    let study_program_value = {};
    let role_value = null;
    if(req.body?.id){
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

        data = await model.d_classroom.findOne({
            attributes: ['id', 'name'],
            include: [
                { 
                    attributes: [ 'id', ['year', 'name'] ],
                    model: model.m_school_year,
                },
                { 
                    attributes: [ 'id', 'name' ],
                    model: model.m_study_program,
                },
                { 
                    attributes: [ 'id', 'name' ],
                    model: model.m_subject,
                },
                { 
                    attributes: [ 'id', 'name' ],
                    model: model.m_lecturer,
                },
            ],
            where: { id: req.body.id },
        });
    }

    if(data){
        school_year_value = {
            key   : data?.m_school_year?.id,
            value : data?.m_school_year?.dataValues?.name,
        };

        study_program_value = {
            key   : data?.m_study_program?.id,
            value : data?.m_study_program?.name,
        };

        subject_value = {
            key   : data?.m_subject?.id,
            value : data?.m_subject?.name,
        };

        lecturer_value = {
            key   : data?.m_lecturer?.id,
            value : data?.m_lecturer?.name,
        };
    }

    res.render('pages/'+req?.body?.path+'/form', {
        school_year: await model.m_school_year.findAll({ attributes: ['id', ['year', 'name']] }),
        study_program: await model.m_study_program.findAll(),
        lecturer: await model.m_lecturer.findAll(),
        school_year_value,
        study_program_value,
        subject_value,
        lecturer_value,
        form,
        data,
        role_value
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);

    try {
        const id = req.body?.myform_hide?.id;
        const myform = req.body?.myform;

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        let result = {};

        if(id === '') {
            result = await model.m_subject.create(myform);
        }else{
            result = await model.m_subject.update(myform, {
                where: {
                    id: id
                }
            });
        }

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

        const result = await model.m_study_program.destroy({
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