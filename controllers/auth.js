const helper    = require('../helpers');
const model     = require('../models');
const form      = require('../helpers/form');
const password  = require("node-php-password");
// const moment    = require('moment');  

module.exports.index = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req?.session?.role}/dasbor`);
    }

    res.render('layouts/auth', {
        base_url : helper.base_url(req),
        view : 'login',
    });
};

module.exports.login = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req.session?.role}/dasbor`);
    }

    // model.user.hasOne(model.m_lecturer, { foreignKey: 'id' });
    const user = await model.user.findOne({
        attributes: ['id', 'role_id'],
        where: { 
            email: req.body.email,
        },
    });    

    req.session = {
        id      : 1,
        role    : 'admin', 
    };

    if(true){
        res.redirect(`/${req.session?.role}/dasbor`);
    }else{
        alert('Gagal Masuk');
        res.redirect('/');
    }
};

module.exports.register = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req?.session?.role}/dasbor`);
    }

    res.render('layouts/auth', {
        base_url  : helper.base_url(req),
        study_program: await model.m_study_program.findAll(),
        view  : 'register',
        form,
    });
};

module.exports.register_proccess = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req.session?.role}/dasbor`);
    }

    try {
        const myform = req.body?.myform;
        const myuser = req.body?.myuser;
        const notused = req.body?.notused;

        const errors = helper.validator({...myform, ...myuser, ...notused});
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        if(myuser?.password !== notused?.password_confirmation) {
            return res.status(422).json({ errors: 'Konfirmasi Password Tidak Cocok' });
        }

        const user = await model.user.create({
            ...myuser, 
            role_id: 4,
            password: password.hash(myuser?.password),
        });

        if(user){
            const data = await model.m_learner.create({
                ...myform, 
                user_id: user?.id,
                // date_of_birth: moment(myform.date_of_birth).format('YYYY-MM-DD')
            });

            if(data){
                return res.status(200).json({ message: 'Berhasil di Simpan', results: data  })   
            }else{
                return res.status(200).json({ message: 'Berhasil di Simpan, tapi data detailnya tidak kesimpan', results: data  })   
            }
        }

        throw Error();
        
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};

module.exports.logout = async function(req, res) {
    req.session = null;
    res.redirect('/');
};