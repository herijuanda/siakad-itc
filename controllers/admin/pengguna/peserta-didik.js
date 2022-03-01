const { Op }    = require("sequelize");
const helper    = require('../../../helpers');
const form      = require('../../../helpers/form');
const model     = require('../../../models');
const routes    = require('../../../routes/menus/admin');

module.exports.index = async function(req, res) {
    res.render('layouts/app', {
        ...routes[2].sub[2],
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    const sequelizeDatatable = require('node-sequelize-datatable'); 
    
    const datatableObj = await sequelizeDatatable(req.body);
    const count = await model.user.count();

    model.user.hasOne(model.m_learner, 
        { 
            sourceKey: 'id', 
            foreignKey: 'user_id' 
        }
    );

    model.m_learner.hasOne(model.m_study_program, 
        { 
            sourceKey: 'study_program_id', 
            foreignKey: 'id' 
        }
    );

    const results = await model.user.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        attributes: [ 'id', 'name', 'email', 'status' ],
        include: [
            { 
                attributes: [ 'register_number' ],
                model: model.m_learner,
                required: true,
                include: [
                    { 
                        attributes: [ 'name' ],
                        model: model.m_study_program,
                        required: false,
                    },
                ],
            }, 
        ],
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    let data = {};
    let study_program_value = {};
    let gender_value = {};

    if(req.body?.id){
        model.user.hasOne(model.m_learner, 
            { 
                sourceKey: 'id', 
                foreignKey: 'user_id' 
            }
        );

        model.m_learner.hasOne(model.m_study_program, 
            { 
                sourceKey: 'study_program_id', 
                foreignKey: 'id' 
            }
        );

        // model.m_learner.hasOne(model.m_school_year, 
        //     { 
        //         sourceKey: 'school_year_id', 
        //         foreignKey: 'id' 
        //     }
        // );
        
        data = await model.user.findOne({
            include: [
                { 
                    model: model.m_learner,
                    required: true,
                    include: [
                        // { 
                        //     attributes: [ 'year' ],
                        //     model: model.m_school_year,
                        //     required: false,
                        // },
                        { 
                            attributes: [ 'id', 'name' ],
                            model: model.m_study_program,
                            required: false,
                        },
                    ],
                },
            ],
            where: { 
                id: req.body.id 
            },
        });

        if(data){
            study_program_value = {
                key   : data?.m_learner?.m_study_program?.id,
                value : data?.m_learner?.m_study_program?.name,
            };

            if(data?.m_learner?.gender_id){
                gender_value = {
                    key   : data?.m_learner?.gender_id,
                    value : data?.m_learner?.gender_id == 1 ? 'Laki - laki' : 'Perempuan',
                };
            }
        }
    }

    console.log('haiii', study_program_value);

    res.render('pages/'+req?.body?.path+'/form', {
        study_program: await model.m_study_program.findAll(),
        study_program_value,
        gender_value,
        form,
        data,
    });
};

module.exports.process = async function(req, res) {
    const bcrypt = require('bcrypt');
    const salt = bcrypt.genSaltSync(10);

    helper.auth(req, res);

    try {
        const id = req.body?.myform_hide?.id;
        const myform = {
            ...req.body?.myform,
            role_id: req.body?.myform_hide?.role_id, 
        };
        const mylecturer = req.body?.mylecturer;

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        if(myform?.password !== myform?.konfirmasi_password){
            return res.status(500).json({ errors: 'Konfirmasi Password Tidak Cocok' });
        }

        delete myform.konfirmasi_password;

        myform.password = bcrypt.hashSync(myform.password, salt);

        const exist = await model.user.count({
            where: {
                [Op.or]: [
                  {
                    username: myform?.username
                  },
                  {
                    email: myform?.email
                  }
                ]
            },
        });

        if(exist > 0){
            return res.status(500).json({ errors: 'Email atau Username Sudah Ada.' });
        }

        let result = {};

        if(id === '') {
            result = await model.user.create(myform);
        }else{
            result = await model.user.update(myform, {
                where: {
                    id: id
                }
            });
        }

        if(result){
            let lecturer = {};

            if(id === '') {
                lecturer = await model.m_lecturer.create({...mylecturer, user_id: result?.id});
            }else{
                lecturer = await model.m_lecturer.update(mylecturer, { 
                    where: {
                        user_id: id
                    }
                });
            }

            if(lecturer){
                return res.status(200).json({ message: 'Berhasil di Simpan' })
            }
        }

        throw Error();
        
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};