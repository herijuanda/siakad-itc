const { Op }    = require("sequelize");
const helper    = require('../../helpers');
const form      = require('../../helpers/form');
const model     = require('../../models');
const routes    = require('../../routes/menus/admin');

module.exports.index = async function(req, res) {
    // console.log(req);
    helper.auth(req, res);
    res.render('layouts/app', {
        ...routes[2],
        session: req.session,
        routes,
        base_url : helper.base_url(req),
        route_now : helper.route_now(req),
    });
};

module.exports.data = async function(req, res) {
    helper.auth(req, res);
    const sequelizeDatatable = require('node-sequelize-datatable'); 
    // const datatable = require('sequelize-datatables');
    
    const datatableObj = await sequelizeDatatable(req.body);
    const count = await model.user.count();
    
    model.user.hasOne(model.role, { foreignKey: 'id' });
    const results = await model.user.findAndCountAll({
        ...helper.dt_clean_params(datatableObj),
        include: [
        //   { model: Picture }, // load all pictures
            { 
                attributes: [ 'name' ],
                model: model.role,
                // where: { id: 1 },
                // required: false,
            },
        ],
        // where: {
        //     role_id: 1,
        // },
        where: {
            role_id : {
                [Op.not]: 1,
            }
        }
    });

    return helper.datatables(req, res, count, results);
};

module.exports.form = async function(req, res) {
    helper.auth(req, res);

    let data = {};
    let role_value = null;
    if(req.body?.id){
        model.user.hasOne(model.role, { foreignKey: 'id' });
        data = model.user.findAll({
            include: [
                { 
                    attributes: [ 'name' ],
                    model: model.role,
                },
            ],
            where: { id: req.body.id }
        });
        
        if(!isEmtpy(data)){
            role_value = {
                key   : data?.role?.id,
                value : data?.role?.name,
            };
        }
        
    }

    res.render('pages/pengguna/form', {
        roles: await model.role.findAll(),
        form,
        data,
        role_value
    });
};

module.exports.process = async function(req, res) {
    helper.auth(req, res);
    // res.render('pages/pengguna/form');
};