// const { Op }    = require("sequelize");
// const { sequelize }    = require("sequelize");
const helper        = require('../../../../helpers');
const form          = require('../../../../helpers/form');
const model         = require('../../../../models');
const routes        = require('../../../../routes/menus/lecturer');
const datatables    = require('node-sequelize-datatable'); 
// const moment    = require('moment');  
// const { body, validationResult } = require('express-validator');

module.exports.index = async function(req, res) {
    helper.auth(req, res);
    res.render('layouts/app', {
        ...routes.detail.modul_pelatihan[0],
        data: await model.m_subject.findOne({
            where: { id: req.query.id } 
        }),
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);

    model.d_subject_module.hasOne(model.m_lecturer, 
        { 
            sourceKey: 'lecturer_id', 
            foreignKey: 'id' 
        }
    );
    
    const datatableObj = await datatables(req.body);
    const count = await model.d_subject_module.count({
        include: [
            { 
                attributes: [],
                model: model.m_lecturer,
                required: true,
                where: { 
                    id:  req.session?.lecturer_id
                },
            },
        ],
        where: { 
            subject_id: req.body.id,
        }
    });
    const results = await model.d_subject_module.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
            { 
                attributes: [],
                model: model.m_lecturer,
                required: true,
                where: { 
                    id:  req.session?.lecturer_id
                },
            },
        ],
        where: { 
            subject_id: req.body.id,
        }
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    let data = {};

    if(req.body?.id){

        data = await model.d_subject_module.findOne({
            attributes: [
                'id', 
                'name', 
                'file', 
            ],
            where: { id: req.body.id },
        });
    }

    res.render('pages/'+req?.body?.path+'/form', {
        subject_id: req.body?.subject_id,
        form,
        data,
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);

    try {
        const file = req?.file?.filename;

        const id = req.body?.myform_hide?.id;
        const subject_id = req.body?.myform_hide?.subject_id;

        const myform = {
            ...req.body?.myform,
            lecturer_id: req.session?.lecturer_id,
            subject_id,
            file: file,
        }

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors, validate_label: helper.english_transleted });
        }

        if (!file && id === '') {
            return res.status(422).json({ errors: 'File Dokumen Wajib di Upload' });
        }

        let result = {};

        if(id === '') {
            result = await model.d_subject_module.create(myform);
        }else{
            result = await model.d_subject_module.update(myform, {
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
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};

module.exports.delete = async function(req, res) {
    helper.auth(req, res);

    try {
        const id = req.body?.id;

        const result = await model.d_subject_module.destroy({
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