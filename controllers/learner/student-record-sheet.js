const { Op }        = require("sequelize");
const helper        = require('../../helpers');
const form          = require('../../helpers/form');
const model         = require('../../models');
const routes        = require('../../routes/menus/learner');
const datatables    = require('node-sequelize-datatable'); 
const moment        = require('moment');

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    res.render('layouts/app', {
        ...routes[5],
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);

    const count = await model.d_student_record_sheet.count({
        where: {
            learner_id: req.session?.learner_id,
        },
    });

    model.d_student_record_sheet.hasOne(model.d_classroom, 
        { 
            sourceKey: 'classroom_id', 
            foreignKey: 'id' 
        }
    );
    
    model.d_student_record_sheet.hasOne(model.m_lecturer, 
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

    model.d_student_record_sheet.hasOne(model.m_subject, 
        { 
            sourceKey: 'subject_id', 
            foreignKey: 'id' 
        }
    );

    const results = await model.d_student_record_sheet.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
            { 
                attributes: [ 'code', 'name' ],
                model: model.d_classroom,
                required: false,
            },
            { 
                attributes: [ 'name' ],
                model: model.m_subject,
                required: false,
            },
            { 
                attributes: [ 'id' ],
                model: model.m_lecturer,
                required: false,
                include: [
                    { 
                        attributes: [ 'name' ],
                        model: model.user,
                        required: false,
                    },
                ],
            },
        ],
        where: {
            learner_id: req.session?.learner_id,
        },
        order: [
            ['id', 'DESC'],    
        ],
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    let data = {};
    // let learner_value = {};

    model.m_subject.hasOne(model.d_classroom, 
        { 
            sourceKey: 'id', 
            foreignKey: 'subject_id' 
        }
    );

    res.render('pages/'+req?.body?.path+'/form', {
        subject: await model.m_subject.findAll({
            attributes: [ 'id', 'name' ],
            include: [
                { 
                    attributes: [],
                    model: model.d_classroom,
                    required: true,
                    where: { 
                        lecturer_id:  req.session?.lecturer_id
                    },
                },
            ],
            order: [
                ['name', 'ASC'],
            ],
            group: 'subject_id',
        }),
        // learner_value,
        form,
        data,
        moment: moment,
        // role_value
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);

    try {
        // const id = req.body?.myform_hide?.id;
        const myform = {
            ...req.body?.myform,
            lecturer_id: req.session?.lecturer_id,
            datetime: req.body?.myform?.datetime ?? moment.utc(helper.datetime(req.body?.myform?.datetime)).format(),
        };

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors, validate_label: helper.english_transleted });
        }

        const result = await model.d_student_record_sheet.create(myform);

        if(result){
            return res.status(200).json({ message: 'Berhasil di Simpan' })
        }

        throw Error();
        
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};