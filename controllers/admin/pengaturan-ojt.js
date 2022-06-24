const { Op }        = require("sequelize");
const helper        = require('../../helpers');
const form          = require('../../helpers/form');
const model         = require('../../models');
const routes        = require('../../routes/menus/admin');
const datatables    = require('node-sequelize-datatable'); 
const moment        = require('moment');

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    res.render('layouts/app', {
        ...routes[3],
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);

    const count = await model.d_mentoring.count();
    
    model.d_mentoring.hasOne(model.m_learner, 
        { 
            sourceKey: 'learner_id', 
            foreignKey: 'id' 
        }
    );

    model.m_learner.hasOne(model.m_school_year, 
        { 
            sourceKey: 'school_year_id', 
            foreignKey: 'id' 
        }
    );

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    model.d_mentoring.hasOne(model.m_mentor, 
        { 
            sourceKey: 'mentor_id', 
            foreignKey: 'id' 
        }
    );

    model.m_mentor.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    const results = await model.d_mentoring.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
            { 
                attributes: [ 'id', 'agency', 'position'],
                model: model.m_mentor,
                required: true,
                include: [
                    { 
                        attributes: [ 'name' ],
                        model: model.user,
                        required: true,
                        where: req.body?.search?.value ? 
                        {
                            name: {
                                [Op.like]: '%'+req.body?.search?.value+'%',
                            } 
                        } : {}
                    },
                ],
            },
            { 
                attributes: [ 'id', 'nis' ],
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
                        model: model.user,
                        required: true,
                        where: req.body?.search?.value ? 
                        {
                            name: {
                                [Op.like]: '%'+req.body?.search?.value+'%',
                            } 
                        } : {}
                    },
                ],
            },
        ],
        where: {},
        order: [
            ['mentor_id', 'ASC'],
        ],
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    model.m_learner.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    model.m_mentor.hasOne(model.user, 
        { 
            sourceKey: 'user_id', 
            foreignKey: 'id' 
        }
    );

    res.render('pages/'+req?.body?.path+'/form', {
        mentor: await model.m_mentor.findAll({
            attributes: [ 'id', 'agency' ],
            include: [
                { 
                    attributes: [ 'name' ],
                    model: model.user,
                    required: true,
                    where: {
                        status: 1,
                    }
                },
            ],
        }),
        learner: await model.m_learner.findAll({
            attributes: [ 'id', 'nis' ],
            include: [
                { 
                    attributes: [ 'name' ],
                    model: model.user,
                    required: true,
                    where: {
                        status: 1,
                    }
                },
            ],
        }),
        form,
        moment: moment,
        // role_value
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);

    try {
        const myform = req.body?.myform;

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors });
        }

        const exist = await model.d_mentoring.count({
            where: {
                learner_id: myform?.learner_id
            },
        });

        if(exist > 0){
            return res.status(422).json({ errors: 'Peserta Didik Telah Didaftarkan' });
        }

        const result = await model.d_mentoring.create(myform);

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

        const result = await model.d_mentoring.destroy({
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