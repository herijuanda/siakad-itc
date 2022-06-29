const { Op }        = require("sequelize");
const helper        = require('../../helpers');
const form          = require('../../helpers/form');
const model         = require('../../models');
const routes        = require('../../routes/menus/learner');
const datatables    = require('node-sequelize-datatable'); 
// const moment        = require('moment');

module.exports.index = async function(req, res) {
    helper.auth(req, res);

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

    const data = await model.d_mentoring.findOne({
        attributes: [ 'id' ],
        include: [
            { 
                attributes: [ 'agency', 'position' ],
                model: model.m_mentor,
                required: true,
                include: [
                    { 
                        attributes: [ 'name'  ],
                        model: model.user,
                        required: true,
                    },
                ],
            },
        ],
        where: { 
            learner_id:  req.session?.learner_id
        },
    });

    res.render('layouts/app', {
        ...routes[6],
        session : req.session,
        data,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    
    const datatableObj = await datatables(req.body);

    const count = await model.d_logbook.count({
        where: {
            mentoring_id: req.body?.mentoring_id,
        },
    });

    const results = await model.d_logbook.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        attributes: [ 
            'id', 
            'date', 
            'time_in', 
            'time_out', 
            'event', 
            'problem', 
            'file', 
            'note', 
            'status', 
            'score'
        ],
        where: {
            mentoring_id: req.body?.mentoring_id,
        },
        order: [
            ['id', 'DESC'],    
        ],
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    res.render('pages/'+req?.body?.path+'/form', {
        mentoring_id: req?.body?.mentoring_id,
        form,
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);

    try {
        const file = req?.file?.filename;

        const myform = {
            ...req.body?.myform,
            mentoring_id: req.body?.myform_hide?.mentoring_id,
            date: helper.date(req.body?.myform?.date),
            file: file,
        };

        console.log('haiii', myform);

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors, validate_label: helper.english_transleted });
        }

        if (!file) {
            return res.status(422).json({ errors: 'Foto kegiatan belum di upload' });
        }

        const result = await model.d_logbook.create(myform);

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

        const result = await model.d_logbook.destroy({
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
