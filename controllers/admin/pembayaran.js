// const { Op }    = require("sequelize");
const helper        = require('../../helpers');
const form          = require('../../helpers/form');
const model         = require('../../models');
const routes        = require('../../routes/menus/admin');
const datatables    = require('node-sequelize-datatable'); 
const moment        = require('moment');  

module.exports.index = async function(req, res) {
    helper.auth(req, res);    

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    res.render('layouts/app', {
        ...routes[2],
        form,
        learner: await model.m_learner.findAll({
            attributes: [ 'id' ],
            include: [
                { 
                    attributes: [ 'name' ],
                    model: model.user,
                    required: true,
                    where: {
                        status: true,
                    }
                },
            ],
        }),
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);
    const count = await model.d_payment.count();
    
    model.d_payment.hasOne(model.m_learner, 
        { 
            sourceKey: 'learner_id', 
            foreignKey: 'id' 
        }
    );

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    let filter = {};

    if(req.body?.learner_id){
        filter = { learner_id: req.body?.learner_id };
    }

    const results = await model.d_payment.findAndCountAll({
        ...{
            ...helper.dt_clean_params(datatableObj),
            where: { 
                ...helper.dt_clean_params(datatableObj)?.where,
                ...filter,
            }
        },
        include: [
            { 
                attributes: [ 'id' ],
                model: model.m_learner,
                include: [
                    { 
                        attributes: [ 'name' ],
                        model: model.user,
                    },
                ],
            },
        ],
        order: [
            ['createdAt', 'DESC'],
        ],
        // where: {
        //     actived: 1,
        // },
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
    let role_value = null;

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    if(req.body?.id){

        data = await model.d_payment.findOne({
            attributes: [
                'id', 
                'value', 
                'datetime', 
                'description', 
                'file_payment'
            ],
            include: [
                { 
                    attributes: [ 'id' ],
                    model: model.m_learner,
                    include: [
                        { 
                            attributes: [ 'name' ],
                            model: model.user,
                        },
                    ]
                },
            ],
            where: { id: req.body.id },
        });
    }

    if(data){
        learner_value = {
            key   : data?.m_learner?.id,
            value : data?.m_learner?.user?.name,
        };
    }

    res.render('pages/'+req?.body?.path+'/form', {
        learner: await model.m_learner.findAll({
            attributes: [ 'id' ],
            include: [
                { 
                    attributes: [ 'name' ],
                    model: model.user,
                },
            ],
        }),
        learner_value,
        form,
        data,
        role_value,
        moment: moment,
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);

    try {
        const file = req?.file?.filename;
        if (!file) {
        res.status(422).json({ errors: 'Bukti Pembayaran Wajib di Upload' });
        }

        const id = req.body?.myform_hide?.id;
        const myform = {
            ...req.body?.myform,
            value: req.body?.myform?.value?.replace(/\./ig, ''),
            datetime: moment.utc(helper.datetime(req.body?.myform?.datetime)).format(),
            file_payment: file,
        }

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        let result = {};

        if(id === '') {
            result = await model.d_payment.create(myform);
        }else{
            result = await model.d_payment.update(myform, {
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
    const fs = require('fs')

    try {
        const id = req.body?.id;

        const result = await model.d_payment.destroy({
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