const helper    = require('../../helpers');
const model     = require('../../models');
const password  = require("node-php-password");

module.exports.index = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req?.session?.role_slug}/dasbor`);
    }

    res.render('layouts/auth', {
        base_url : helper.base_url(req),
        view : 'login',
    });
};

module.exports.process = async function(req, res) {
    if(req?.session?.id) {
        res.redirect(`/${req.session?.role}/dasbor`);
    }

    model.user.hasOne(model.role, 
        { 
            sourceKey: 'role_id', 
            foreignKey: 'id' 
        }
    );

    model.user.hasOne(model.m_lecturer, 
        { 
            sourceKey: 'id', 
            foreignKey: 'user_id' 
        }
    );

    model.user.hasOne(model.m_learner, 
        { 
            sourceKey: 'id', 
            foreignKey: 'user_id' 
        }
    );

    const user = await model.user.findOne({
        attributes: ['id', 'role_id', 'name', 'password'],
        include: [
            { 
                attributes: [ 'name', 'slug' ],
                model: model.role,
                required: true,
            },
            { 
                attributes: [ 'id' ],
                model: model.m_lecturer,
            },
            { 
                attributes: [ 'id' ],
                model: model.m_learner,
            },
        ],
        where: { 
            email: req.body.email,
        },
    });    

    if(!user){
        res.status(500).json({ errors: 'Email Ditemukan !' });
    }

    if(password.verify(req.body.password, user?.password)){
        req.session = {
            id          : user?.id,
            name        : user?.name,
            role_id     : user?.role_id,
            role_name   : user?.role?.name,
            role_slug   : user?.role?.slug,
            lecturer_id : user?.m_lecturer?.id || null,
            learner_id  : user?.m_learner?.id || null,
        };

        return res.status(200).json({ message: 'Berhasil Login', results: req.session  })   
    }else{
        res.status(500).json({ errors: 'Password Anda Salah !' });
    }
};

module.exports.logout = async function(req, res) {
    req.session = null;
    res.redirect('/');
};