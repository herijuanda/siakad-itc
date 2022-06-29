const helper    = require('../../../helpers');
const model     = require('../../../models');
const routes    = require('../../../routes/menus/learner');

module.exports.index = async function(req, res) {
    helper.auth(req, res);

    try {
        const detail = JSON.parse(helper.decrypt(req?.query?.params));
        const data = await model.d_subject_module.findAll({
            attributes: [ 
                'id',
                'name', 
                'file',
                [
                    model.sequelize.literal(`(
                        SELECT COUNT(id)
                        FROM d_subject_module_reads AS reader
                        WHERE 
                            reader.module_id = d_subject_module.id
                            AND reader.learner_id = '${req?.session?.learner_id}'
                    )`),
                    'status'
                ]
            ],
            where: { 
                lecturer_id: detail?.lecturer_id,
                subject_id: detail?.subject_id,
            },
        });
        
        let progress = 0;
        data.forEach(function(value){ 
            progress += value?.dataValues?.status;
        });

        res.render('layouts/app', {
            ...routes.detail.modul_pelatihan,
            session : req.session,
            routes,
            base_url : helper.base_url(req),
            route_now : helper.route_now(req),
            params : req?.query?.params,
            detail, 
            data,
            progress: progress ? (progress / data?.length) * 100 : 0,
        });
    } catch (error) {
        res.writeHead(302, {
            'Location': helper.base_url(req) + '/peserta-didik/modul-pelatihan'
        });
        res.end();
    }
};

module.exports.update_read = async function(req, res) {
    helper.auth(req, res);

    try {
        const myform = {
            module_id: req?.body?.id,
            learner_id: req.session?.learner_id,
        }

        const errors = helper.validator(myform);
        if (errors?.length !== 0) {
            return res.status(400).json({ errors: errors, validate_label: helper.english_transleted });
        }

        const result = await model.d_subject_module_read.create(myform);

        if(result){

            // const data = model.d_subject_module_read.findAll({
            //     where: { 
            //         module_id: 
            //     }
            // });

            return res.status(200).json({ message: 'Berhasil di Simpan' })
        }

        throw Error();
        
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ errors: 'Terjadi kesalahan' });
    }
};