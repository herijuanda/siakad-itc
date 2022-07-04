// const { Op }        = require("sequelize");
const helper        = require('../../../helpers');
const form          = require('../../../helpers/form');
const model         = require('../../../models');
const routes        = require('../../../routes/menus/admin');
const datatables    = require('node-sequelize-datatable'); 


module.exports.index = async function(req, res) {
    res.render('layouts/app', {
        ...routes[0].sub[0],
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);
    const count = await model.m_learner.count();

    model.user.hasOne(model.m_learner, 
        { 
            sourceKey: 'id', 
            foreignKey: 'user_id' 
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

    const results = await model.user.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        attributes: [ 'id', 'name', 'email', 'status' ],
        include: [
            { 
                attributes: [ 'register_number', 'nis' ],
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

        data = await model.user.findOne({
            include: [
                { 
                    model: model.m_learner,
                    required: true,
                    include: [
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

    res.render('pages/'+req?.body?.path+'/form', {
        study_program: await model.m_study_program.findAll(),
        study_program_value,
        gender_value,
        form,
        data,
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);

    try {
        const myform_hide = req.body?.myform_hide;
        const myform = req.body?.myform;
        const myuser = req.body?.myuser;
        const notused = req.body?.notused;

        const validator = { ...myform_hide, ...myform, ...myuser};

        if(myform_hide?.id) {
            delete validator.password;
        }

        const errors = helper.validator(validator);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors, validate_label: helper.english_transleted });
        }

        if(!helper.email_validate(myuser?.email)) {
            return res.status(422).json({ errors: 'Format Email Tidak Sesuai' });
        }

        if (myuser?.password) {
            if(myuser?.password?.length < 8) {
                return res.status(422).json({ errors: 'Password Kurang dari 8 Angka' });
            }

            if(myuser?.password_confirmation?.length < 8) {
                return res.status(422).json({ errors: 'Konfirmasi Password Kurang dari 8 Angka' });
            }

            if(myuser?.password !== notused?.password_confirmation) {
                return res.status(422).json({ errors: 'Konfirmasi Password Tidak Cocok' });
            }

            myuser = {
                ...myuser,
                password: password.hash(myuser?.password),
            }
        } else {
            delete myuser.password;
        }

        if(!myform_hide?.id){
            const exist = await model.m_learner.count({
                where: {
                    nis: myform?.nis
                },
            });
    
            if(exist){
                return res.status(422).json({ errors: 'NIS Sudah Ada.' });
            }
        }

        await model.user.update({ ...myuser, status: true }, { where: { id: myform_hide?.id } });

        // const last_data = await model.m_learner.findOne({
        //     attributes: ['nis'],
        //     where: { 
        //         school_year_id : myform_hide?.school_year_id,
        //         nis: { [Op.not]: null },
        //     },
        //     order: [
        //         ['id', 'DESC'],
        //     ],
        // });

        // let nis = 1;

        // if(last_data){
        //     nis = Number(last_data?.nis);
        //     nis++;
        // }

        const data = await model.m_learner.update({
            ...myform, 
            // nis: nis.toString().padStart(5, "0"),
            date_of_birth: helper.date(myform?.date_of_birth),
        }, { where: { user_id: myform_hide?.id } });

        if(data){
            return res.status(200).json({ message: myuser?.name+' Berhasil di Simpan', results: data  })   
        }else{
            return res.status(200).json({ message: myuser?.name+' Berhasil di Simpan, tapi data detailnya tidak kesimpan', results: data  })   
        }
        
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};

module.exports.actived = async function(req, res) {
    helper.auth(req, res);

    try {
        const id = req.body?.id;
        const actived = req.body?.actived;

        const result = await model.user.update({ status: actived }, {
            where: {
                id: id
            }
        });

        if(result){
            return res.status(200).json({ message: 'Berhasil di Hapus' })
        }

        throw Error();
        
    } catch (error) {
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};

module.exports.delete = async function(req, res) {
    helper.auth(req, res);

    try {
        const id = req.body?.id;

        await model.m_learner.destroy({
            where: {
                user_id: id
            }
        });

        const user = await model.user.destroy({
            where: {
                id: id
            }
        });

        if(user){    
            return res.status(200).json({ message: 'Berhasil di Hapus' })
        }

        throw Error();
        
    } catch (error) {
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};