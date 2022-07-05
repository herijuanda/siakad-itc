const { Op }    = require("sequelize");
const helper    = require('../../../helpers');
const constant  = require('../../../helpers/constant');
const model     = require('../../../models');
const routes    = require('../../../routes/menus/learner');
// const moment    = require('moment');  

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    try {
        if (!req.session?.quiz) {
            throw new Error;
        }

        res.render('layouts/app', {
            ...routes.detail.modul_pelatihan.quiz,
            session : req.session,
            routes,
            base_url : helper.base_url(req),
            route_now : helper.route_now(req),
            alpha : ['a', 'b', 'c', 'd', 'e'],
        });
    } catch (error) {
        res.writeHead(302, {
            'Location': helper.base_url(req) + '/peserta-didik/modul-pelatihan'
        });
        res.end();
    }
};

module.exports.setup = async function(req, res) {
    helper.auth(req, res);

    try {
        
        const condition = { 
            ...JSON.parse(helper.decrypt(req?.body?.params)), 
            learner_id: req.session?.learner_id 
        };

        if (req.session?.quiz) {
            return res.status(302).json({ message: 'Kuis Sedang Berlansung' });
        }

        model.d_subject_quiz.hasOne(model.m_subject, 
            { 
                sourceKey: 'subject_id', 
                foreignKey: 'id' 
            }
        );

        model.d_subject_quiz.hasMany(model.d_subject_quiz_answer, 
            { 
                sourceKey: 'id', 
                foreignKey: 'quiz_id' 
            }
        );

        const result = await model.d_subject_quiz.findOne({ 
            include: [
                { 
                    attributes: [ 'id', 'name' ],
                    model: model.m_subject,
                    required: true,
                },
                { 
                    attributes: [ 'id', 'answer', 'correct' ],
                    model: model.d_subject_quiz_answer,
                    required: true,
                },
            ],
            where: { 
                lecturer_id: condition?.lecturer_id,
                subject_id: condition?.subject_id,
            },
            order: [
                ['id', 'ASC'],
            ],
        });

        if(!result){
            return res.status(422).json({ message: 'Soal Belum Tersedia' });
        }

        const data = await model.d_learner_value.findOne({ 
            where: { ...condition, kuis: { [Op.not]: null } }
        });

        if(data){
            return res.status(422).json({ message: 'Kuis Sudah Pernah dilakukan' });
        }

        await model.d_learner_value
            .findOne({ where: condition })
            .then(function(obj) {
                // update
                if(obj)
                    return obj.update({ kuis: 0 });
                // insert
                return model.d_learner_value.create({ ...condition, kuis: 0 });
            })

        req.session = {
            ...req.session,
            quiz : {
                classroom   : {
                    classroom_id            : condition?.classroom_id,
                    classroom_learner_id    : condition?.classroom_learner_id,
                },
                subject     : result?.m_subject,
                question    : result || null,
                time        : constant.quiz_time,
                no          : 1,
            },
        };

        return res.status(200).json({ message: 'Berhasil di proses' })
        
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};

module.exports.next = async function(req, res) {
    helper.auth(req, res);

    try {

        if (!req.session?.quiz) {
            return res.status(500).json({ message: 'Ujian telah selesai, tidak bisa di proses lagi' });
        }

        const status = req?.body?.status;
        let choose = req?.body?.choose;

        // Deklarasi session untuk jawaban apabila belum dibuat
        if (!req.session?.quiz?.answer) {
            req.session.quiz = {
                ...req.session.quiz,
                answer: [],
            };
        }

        let answer = {
            classroom_id: req.session?.quiz?.classroom?.classroom_id,
            classroom_learner_id: req.session?.quiz?.classroom?.classroom_learner_id,
            lecturer_id: req.session?.quiz?.question?.lecturer_id,
            subject_id: req.session?.quiz?.question?.subject_id,
            learner_id: req.session?.learner_id,
            quiz_id: req.session?.quiz?.question?.id,
        }

        // Status = true maka pilihan dari buttonnya simpan, apabila status = false maka pilihannya lewati
        // Choose merupakan hasil pilihan jawaban dari user
        if(status && choose) {
            choose = JSON.parse(choose);
            
            answer = {
                ...answer,
                answer_id: choose?.id,
                correct: choose?.correct,
            }
        } else {
            answer = {
                ...answer,
                answer_id: null,
                correct: 0,
            }
        }

        req.session?.quiz?.answer.push(answer);

        model.d_subject_quiz.hasOne(model.m_subject, 
            { 
                sourceKey: 'subject_id', 
                foreignKey: 'id' 
            }
        );

        model.d_subject_quiz.hasMany(model.d_subject_quiz_answer, 
            { 
                sourceKey: 'id', 
                foreignKey: 'quiz_id' 
            }
        );

        const result = await model.d_subject_quiz.findOne({ 
            include: [
                { 
                    attributes: [ 'id', 'name' ],
                    model: model.m_subject,
                    required: true,
                },
                { 
                    attributes: [ 'id', 'answer', 'correct' ],
                    model: model.d_subject_quiz_answer,
                    required: true,
                },
            ],
            where: { 
                lecturer_id: req.session?.quiz?.question?.lecturer_id,
                subject_id: req.session?.quiz?.question?.subject_id,
                id: {
                    [Op.gt]: req.session?.quiz?.question?.id,
                }
            },
            order: [
                ['id', 'ASC'],
            ],
        });

        // Kondisi apabila soal berikutnya kosong maka ujian akan diselesaikan
        if(!result){
            return res.status(300).json({ message: 'Soal Sudah Selesai' });
        }

        req.session = {
            ...req.session,
            quiz : {
                ...req.session?.quiz,
                question    : result,
                no          : (req.session?.quiz?.no + 1)
            },
        };

        // return res.status(200).json({ message: 'Berhasil di proses' })
        return res.render('pages/learner/modul-pelatihan/quiz/question',
            { 
                session : req.session,
                alpha : ['a', 'b', 'c', 'd', 'e'],
            }
        );
        
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ message: 'Terjadi kesalahan' });
    }
};

module.exports.done = async function(req, res) {
    helper.auth(req, res);

    try {
        if (!req.session?.quiz) {
            return res.status(500).json({ message: 'Ujian telah selesai, tidak bisa di proses lagi' });
        }

        let total = 0;

        req.session?.quiz?.answer.forEach(function(_value) {
            if(_value?.correct) {
                total++;
            }
        });

        total = (total / req.session?.quiz?.answer?.length) * 100;

        await model.d_subject_quiz_result.bulkCreate(req.session?.quiz?.answer);
        await model.d_learner_value.update({ kuis: total }, {
            where: {
                classroom_id: req.session?.quiz?.classroom?.classroom_id,
                classroom_learner_id: req.session?.quiz?.classroom?.classroom_learner_id,
                lecturer_id: req.session?.quiz?.question?.lecturer_id,
                subject_id: req.session?.quiz?.question?.subject_id,
                learner_id: req.session?.learner_id,
            }
        });

        model.m_lecturer.hasOne(model.user, 
            { 
                sourceKey: 'user_id', 
                foreignKey: 'id' 
            }
        );

        const lecturer = await model.m_lecturer.findOne({ 
            attributes: ['id'],
            include: [
                { 
                    attributes: [ 'name' ],
                    model: model.user,
                },
            ],
            where: { 
                id: req.session?.quiz?.question?.lecturer_id,
            },
        });

        req.session.quiz_result = { 
            subject: req.session?.quiz?.subject,
            lecturer: lecturer,
            total,
        }

        req.session.quiz = null;

        return res.status(200).json({ message: 'Berhasil di proses' })
        
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ message: 'Terjadi kesalahan' });
    }
};

module.exports.result = async function(req, res) {
    helper.auth(req, res);
    res.render('layouts/app', {
        ...routes.detail.modul_pelatihan.result,
        session : req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.set_time = async function(req, res) {
    helper.auth(req, res);
    req.session = {
        ...req.session,
        quiz_time: req?.body?.minute,
    };
    return res.status(200).json({ message: 'Berhasil di proses' })
};