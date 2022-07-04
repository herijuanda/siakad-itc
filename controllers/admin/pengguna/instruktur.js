// const { Op }    = require("sequelize");
const helper        = require('../../../helpers');
const form          = require('../../../helpers/form');
const model         = require('../../../models');
const routes        = require('../../../routes/menus/admin');
const datatables    = require('node-sequelize-datatable'); 

module.exports.index = async function(req, res) {
    helper.auth(req, res);
    // res.json(routes[3].sub[0]);
    res.render('layouts/app', {
        ...routes[0].sub[1],
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);
    const count = await model.m_lecturer.count();

    model.user.hasOne(model.m_lecturer, 
        { 
            sourceKey: 'id', 
            foreignKey: 'user_id' 
        }
    );

    const results = await model.user.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
            { 
                attributes: [ 'nip', 'last_education', 'year_of_entry' ],
                model: model.m_lecturer,
                required: true,
            },
        ],
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    let data = {};
    // let role_value = null;
    if(req.body?.id){
        model.user.hasOne(model.m_lecturer, 
            { 
                sourceKey: 'id', 
                foreignKey: 'user_id' 
            }
        );
        
        data = await model.user.findOne({
            attributes: ['id', 'name', 'email'],
            include: [
                { 
                    attributes: [ 
                        'nip', 
                        'last_education', 
                        'year_of_entry' 
                    ],
                    model: model.m_lecturer,
                },
            ],
            where: { 
                id: req.body.id 
            },
        });
        
    }

    res.render('pages/'+req?.body?.path+'/form', {
        form,
        data,
    });
};

module.exports.process = async function(req, res) {
    const password  = require("node-php-password");

    helper.auth(req, res);

    try {
        const id = req.body?.myform_hide?.id;
        let myform = {
            ...req.body?.myform,
            role_id: req.body?.myform_hide?.role_id, 
        };
        const mylecturer = req.body?.mylecturer; 
        const mypassword = req.body?.mypassword;

        let validator = {
            ...myform,
            ...mylecturer,
        };

        if(!id){
            validator = {
                ...validator,
                ...mypassword,
            }
        }

        const errors = helper.validator(validator);
        
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors, validate_label: helper.english_transleted });
        }

        myform = {
            ...myform,
            ...mypassword,
        };

        if(!helper.email_validate(myform?.email)) {
            return res.status(422).json({ errors: 'Format Email Tidak Sesuai' });
        }

        if(myform?.password){
            if(myform?.password?.length < 8) {
                return res.status(422).json({ errors: 'Password Kurang dari 8 Angka' });
            }

            if(myform?.password_confirmation?.length < 8) {
                return res.status(422).json({ errors: 'Konfirmasi Password Kurang dari 8 Angka' });
            }
            
            if(myform?.password !== myform?.password_confirmation){
                return res.status(500).json({ errors: 'Konfirmasi Password Tidak Cocok' });
            }

            myform.password = password.hash(myform?.password);
        }else{
            delete myform.password;
        }

        delete myform.konfirmasi_password;

        if(!id){
            const exist = await model.user.count({
                where: {
                    email: myform?.email
                },
            });
    
            if(exist){
                return res.status(422).json({ errors: 'Email Sudah Ada.' });
            }

            const existNIP = await model.m_lecturer.count({
                where: {
                    nip: mylecturer?.nip
                },
            });
    
            if(existNIP){
                return res.status(422).json({ errors: 'NIP Sudah Ada.' });
            }
        }

        let result = {};

        if(id === '') {
            result = await model.user.create({...myform, status: 1});
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
            return res.status(200).json({ message: 'Berhasil di Update' })
        }

        throw Error();
        
    } catch (error) {
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};

module.exports.status = async function(req, res) {
    helper.auth(req, res);

    try {
        const id = req.body?.id;
        const value = req.body?.value;

        result = await model.user.update({ status: value }, {
            where: {
                id: id
            }
        });

        if(result){
            return res.status(200).json({ message: 'Berhasil di ubah status' })
        }

        throw Error();
        
    } catch (error) {
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};