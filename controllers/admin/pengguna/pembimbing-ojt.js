// const { Op }    = require("sequelize");
const helper        = require('../../../helpers');
const form          = require('../../../helpers/form');
const model         = require('../../../models');
const routes        = require('../../../routes/menus/admin');
const datatables    = require('node-sequelize-datatable'); 

module.exports.index = async function(req, res) {
    helper.auth(req, res);
    res.render('layouts/app', {
        ...routes[2].sub[1],
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);
    const count = await model.user.count({
        where: {
            role_id: 5,
        },
    });
    
    const results = await model.user.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        where: {
            role_id: 5,
        },
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    let data = {};
    if(req.body?.id){
        
        data = await model.user.findOne({
            attributes: ['id', 'name', 'email'],
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
        const mypassword = req.body?.mypassword;

        let validator = myform;

        if(!id){
            validator = {
                ...validator,
                ...mypassword,
            }
        }

        const errors = helper.validator(validator);
        
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        myform = {
            ...myform,
            ...mypassword,
        };

        if(myform?.password){
            if(myform?.password !== myform?.konfirmasi_password){
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
    
            if(exist > 0){
                return res.status(422).json({ errors: 'Email Sudah Ada.' });
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

        const result = await model.user.destroy({
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
        res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};