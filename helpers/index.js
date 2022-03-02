module.exports.base_url = (req) => {
    return req.protocol + '://' + req.headers.host
}

module.exports.route_now = (req) => {
    const url = require('url') ;
    return url.parse(req.url).pathname;
}

module.exports.auth = (req, res) => {
    if(!req.session?.id) {
        res.redirect('/');
    }
}

module.exports.dt_clean_params = function(data) {
    const attributes = [];

    data?.attributes.forEach(function(v) {
        if(v != ''){
            attributes.push(v);
        }
    });

    const result = {
        ...data,
        attributes,
        order : [ [ 'id' , 'asc' ] ],
    }

    return result;
};

module.exports.datatables = function(req, res, count, results) {
    return res.json({
        "draw"              : req.body.draw,
        "recordsFiltered"   : results.count,
        "recordsTotal"      : count,
        "data"              : results.rows
    });
};

module.exports.validator = (body) => {
    const arr = [];

    for (const key in body) {
        if(body[key] === ''){
            arr.push(key);
        }
    }
    
    return arr;
}

module.exports.date_format = function(data) {
    const value = data?.split('-');
    return value?.[2]+'-'+value?.[1]+'-'+value?.[0];
};