// const { Op }    = require("sequelize");
const helper        = require('../../../helpers');
const form          = require('../../../helpers/form');
const model         = require('../../../models');
const routes        = require('../../../routes/menus/admin');
const datatables    = require('node-sequelize-datatable'); 

module.exports.index = async function(req, res) {
    helper.auth(req, res);
    res.render('layouts/app', {
        ...routes[1].sub[1],
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);
    const count = await model.m_subject.count();
    
    model.m_subject.hasOne(model.m_study_program, 
        { 
            sourceKey: 'study_program_id', 
            foreignKey: 'id' 
        }
    );
    const results = await model.m_subject.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
            { 
                attributes: [ 'name' ],
                model: model.m_study_program,
                required: true,
            },
        ],
        order: [
            ['study_program_id', 'ASC'],
            ['step', 'ASC'],
            ['id', 'ASC'],
        ],
        // where: {
        //     role_id: 4,
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
    let study_program_value = {};
    // let role_value = null;

    if(req.body?.id){
        model.m_subject.hasOne(model.m_study_program, 
            { 
                sourceKey: 'study_program_id', 
                foreignKey: 'id' 
            }
        );

        data = await model.m_subject.findOne({
            attributes: ['id', 'name', 'step'],
            include: [
                { 
                    attributes: [ 'id', 'name' ],
                    model: model.m_study_program,
                },
            ],
            where: { id: req.body.id },
        });
    }

    if(data){
        study_program_value = {
            key   : data?.m_study_program?.id,
            value : data?.m_study_program?.name,
        };
    }

    res.render('pages/'+req?.body?.path+'/form', {
        study_program: await model.m_study_program.findAll(),
        study_program_value,
        form,
        data,
        // role_value
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);

    try {
        const id = req.body?.myform_hide?.id;
        const myform = req.body?.myform;

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        let result = {};

        if(id === '') {
            result = await model.m_subject.create(myform);
        }else{
            result = await model.m_subject.update(myform, {
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

        const result = await model.m_subject.destroy({
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