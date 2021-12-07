const helper    = require('../helpers');
const model     = require('../models');

module.exports.index = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req?.session?.role}/dasbor`);
    }

    res.render('layouts/auth', {
        base_url : helper.base_url(req),
    });
};

module.exports.login = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req.session?.role}/dasbor`);
    }

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

module.exports.logout = async function(req, res) {
    req.session = null;
    res.redirect('/');
};