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
        ...routes.detail.modul_pelatihan[1],
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

    model.d_subject_quiz.hasOne(model.m_lecturer, 
        { 
            sourceKey: 'lecturer_id', 
            foreignKey: 'id' 
        }
    );

    model.d_subject_quiz.hasMany(model.d_subject_quiz_answer, 
        { 
            sourceKey: 'id', 
            foreignKey: 'quiz_id' 
        }
    );
    
    const datatableObj = await datatables(req.body);
    const count = await model.d_subject_quiz.count({
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
    const results = await model.d_subject_quiz.findAndCountAll({
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
            { 
                attributes: [ 'answer', 'correct' ],
                model: model.d_subject_quiz_answer,
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

        model.d_subject_quiz.hasMany(model.d_subject_quiz_answer, 
            { 
                sourceKey: 'id', 
                foreignKey: 'quiz_id' 
            }
        );

        data = await model.d_subject_quiz.findOne({
            attributes: [
                'id', 
                'question',  
            ],
            include: [
                { 
                    attributes: [ 'answer', 'correct' ],
                    model: model.d_subject_quiz_answer,
                },
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
        
        let id = req.body?.myform_hide?.id;
        const subject_id = req.body?.myform_hide?.subject_id;
        const myform = {
            ...req.body?.myform,
            lecturer_id: req.session?.lecturer_id,
            subject_id,
        }
        const myanswer = req.body?.myanswer;
        const mycorrect = req.body?.mycorrect;

        const errors = helper.validator({...myform, ...myanswer});
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors, validate_label: helper.english_transleted });
        }

        let result = {};

        if(id === '') {
            result = await model.d_subject_quiz.create(myform);

            id = result?.id;
        }else{
            result = await model.d_subject_quiz.update(myform, {
                where: {
                    id: id
                }
            });

            await model.d_subject_quiz_answer.destroy({
                where: {
                    quiz_id: id
                }
            });            
        }

        const answer = [];

        for (let i = 1; i <= 4; i++) {
            answer.push({
                quiz_id: id,
                answer: myanswer['answer_' + i],
                correct: mycorrect == i,
            });
        }

        await model.d_subject_quiz_answer.bulkCreate(answer);

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

        await model.d_subject_quiz_answer.destroy({
            where: {
                quiz_id: id
            }
        });  

        const result = await model.d_subject_quiz.destroy({
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