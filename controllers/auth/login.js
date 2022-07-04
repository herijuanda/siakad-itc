const helper    = require('../../helpers');
const model     = require('../../models');
const password  = require("node-php-password");

module.exports.index = async function(req, res) {
    if (req?.session?.id) {
        if ( 
            req?.session?.role_slug == 'superadmin' 
            || req?.session?.role_slug == 'admin' 
        ) {
            return res.redirect(`/${req?.session?.role_slug}/pengguna/peserta-didik`);
        }
        
        return res.redirect(`/${req?.session?.role_slug}/dasbor`);
    }

    return res.render('layouts/auth', {
        base_url : helper.base_url(req),
        view : 'login',
    });
};

module.exports.process = async function(req, res) {
    try {
        
        if(req?.session?.id) {
            return res.status(422).json({ errors: 'Anda Sudah Login' });
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

        model.user.hasOne(model.m_mentor, 
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
            attributes: ['id', 'role_id', 'name', 'password', 'status'],
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
                    model: model.m_mentor,
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
            return res.status(422).json({ errors: 'Email Tidak Ditemukan !' });
        }

        if(password.verify(req.body.password, user?.password)){
            if(!user?.status){
                return res.status(422).json({ errors: 'Akun Tidak Aktif, Silahkan Hubungi Admin !' });
            }
            
            const data = {
                id          : user?.id,
                name        : user?.name,
                role_id     : user?.role_id,
                role_name   : user?.role?.name,
                role_slug   : user?.role?.slug,
                lecturer_id : user?.m_lecturer?.id || null,
                mentor_id   : user?.m_mentor?.id || null,
                learner_id  : user?.m_learner?.id || null,
            }

            req.session = data;

            return res.status(200).json({ message: 'Berhasil Login', results: 
                { 
                    ...data, 
                    link: data?.role_slug + (
                        ( data?.role_slug == 'admin' ) 
                        ? '/pengguna/peserta-didik' 
                        : '/dasbor'
                    ) 
                }  
            });
        }else{
            return res.status(422).json({ errors: 'Password Anda Salah !' });
        }
    } catch (error) {
        return res.status(500).json({ errors: 'Terjadi Kesalahan' });
    }
};

module.exports.logout = async function(req, res) {
    req.session = null;
    res.redirect('/');
};