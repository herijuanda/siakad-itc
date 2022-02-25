const { Op }    = require("sequelize");
const helper    = require('../../../helpers');
const form      = require('../../../helpers/form');
const model     = require('../../../models');
const routes    = require('../../../routes/menus/admin');

module.exports.index = async function(req, res) {
    helper.auth(req, res);
    // res.json(routes[2].sub[0]);
    res.render('layouts/app', {
        ...routes[2].sub[0],
        session : req.session,
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
    const count = await model.user.count();
    
    // model.user.hasOne(model.role, { foreignKey: 'id' });
    const results = await model.user.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        // include: [
        //     { 
        //         attributes: [ 'id' ],
        //         model: model.role,
        //         where: { slug: 'instruktur' },
        //         // required: false,
        //     },
        // ],
        where: {
            role_id: 3,
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
    // let role_value = null;
    if(req.body?.id){
        model.user.hasOne(model.m_lecturer, { foreignKey: 'user_id' });
        
        data = await model.user.findOne({
            attributes: ['id', 'name'],
            include: [
                { 
                    attributes: [ 
                        'position', 
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
        // model.user.hasOne(model.role, { foreignKey: 'id' });
        // data = model.user.findAll({
        //     include: [
        //         { 
        //             attributes: [ 'name' ],
        //             model: model.role,
        //         },
        //     ],
        //     where: { id: req.body.id }
        // });
        
        // if(!isEmtpy(data)){
        //     role_value = {
        //         key   : data?.role?.id,
        //         value : data?.role?.name,
        //     };
        // }
        
    }

    res.render('pages/'+req?.body?.path+'/form', {
        // roles: await model.role.findAll(),
        form,
        data,
        // role_value
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