
const helper    = require('../../helpers');
const model     = require('../../models');
const form      = require('../../helpers/form');
const password  = require("node-php-password");
// const moment    = require('moment');  

module.exports.index = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req?.session?.role_slug}/dasbor`);
    }

    res.render('layouts/auth', {
        base_url  : helper.base_url(req),
        study_program: await model.m_study_program.findAll(),
        view  : 'register',
        form,
    });
};

module.exports.process = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req?.session?.role_slug}/dasbor`);
    }

    try {
        const myform = req.body?.myform;
        const myuser = req.body?.myuser;
        const notused = req.body?.notused;

        const errors = helper.validator({...myform, ...myuser, ...notused});
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        if(!helper.email_validate(myuser?.email)) {
            return res.status(422).json({ errors: 'Format Email Tidak Sesuai' });
        }

        if(myuser?.password !== notused?.password_confirmation) {
            return res.status(422).json({ errors: 'Konfirmasi Password Tidak Cocok' });
        }

        const existEmail = await model.user.count({
            where: { email : myuser?.email },
        });

        if(existEmail){
            return res.status(422).json({ errors: 'Email sudah didaftarkan' });
        }

        const school_year = await model.m_school_year.findOne({
            attributes: ['id'],
            where: { year: new Date().getFullYear() },
        });

        // const last_data = await model.m_learner.findOne({
        //     attributes: ['nis',],
        //     where: { school_year_id : school_year?.id },
        //     order: [
        //         ['id', 'DESC'],
        //     ],
        // });

        // let nis = 1;

        // if(last_data){
        //     nis = Number(last_data?.nis);
        //     nis++;
        // }

        const user = await model.user.create({
            ...myuser, 
            role_id: 4,
            password: password.hash(myuser?.password),
        });

        if(user){
            const data = await model.m_learner.create({
                ...myform, 
                user_id: user?.id,
                school_year_id: school_year?.id,
                // nis: nis.toString().padStart(5, "0"),
                date_of_birth: helper.date(myform?.date_of_birth),
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
