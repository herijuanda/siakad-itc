// const { Op }        = require("sequelize");
const helper        = require('../../../../helpers');
const form          = require('../../../../helpers/form');
const model         = require('../../../../models');
const routes        = require('../../../../routes/menus/admin');
const datatables    = require('node-sequelize-datatable'); 
const moment        = require('moment');  

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
        ...routes.detail.kelas[1],
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
                    attributes: [ 'name' ],
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
    const count = await model.d_classroom_timetable.count({ 
        where: {
            classroom_id: req.body?.id,
        },
    });

    const results = await model.d_classroom_timetable.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        where: {
            classroom_id: req.body?.id,
        },
        order: [
            ['timetable', 'ASC'],    
        ],
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    let data = {};

    if(req.body?.id){
        data = await model.d_classroom_timetable.findOne({
            attributes: ['id', 'timetable', 'room'],
            where: { id: req.body.id },
        });
    }

    res.render('pages/'+req?.body?.path+'/form', {
        classroom_id: req?.body?.classroom_id,
        form,
        data,
        moment: moment,
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
            timetable: moment.utc(helper.datetime(req.body?.myform?.timetable)).format(),
        };

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        let result = {};

        if(id === '') {
            result = await model.d_classroom_timetable.create(myform);
        }else{
            result = await model.d_classroom_timetable.update(myform, {
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

        const result = await model.d_classroom_timetable.destroy({
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