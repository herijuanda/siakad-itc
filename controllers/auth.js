const helper    = require('../helpers');
const model     = require('../models');
const form      = require('../helpers/form');

module.exports.index = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req?.session?.role}/dasbor`);
    }

    res.render('layouts/auth', {
        base_url : helper.base_url(req),
        view : 'login',
    });
};

module.exports.login = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req.session?.role}/dasbor`);
    }

    // model.user.hasOne(model.m_lecturer, { foreignKey: 'id' });
    const user = await model.user.findOne({
        attributes: ['id', 'role_id'],
        // include: [
        //     { 
        //         attributes: [ 
        //             'position', 
        //             'last_education', 
        //             'year_of_entry' 
        //         ],
        //         model: model.m_lecturer,
        //     },
        // ],
        where: { 
            username: req.body.username,
        },
    });    

    req.session = {
        id      : 1,
        role    : 'admin', 
    };

    if(true){
        res.redirect(`/${req.session?.role}/dasbor`);
    }else{
        alert('Gagal Masuk');
        res.redirect('/');
    }
};

module.exports.register = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req?.session?.role}/dasbor`);
    }

    res.render('layouts/auth', {
        base_url  : helper.base_url(req),
        study_program: await model.m_study_program.findAll(),
        view  : 'register',
        form,
    });
};

module.exports.register_proccess = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req.session?.role}/dasbor`);
    }
};

module.exports.logout = async function(req, res) {
    req.session = null;
    res.redirect('/');
};