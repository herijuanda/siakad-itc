module.exports.base_url = (req) => {
    return req.protocol + '://' + req.headers.host
}

module.exports.route_now = (req) => {
    const url = require('url') ;
    return url.parse(req.url).pathname;
}

module.exports.auth = (req, res) => {
    if(!req.session?.role) {
        res.redirect('/');
    }
}

module.exports.dt_clean_params = function(data) {
    const index = data?.attributes.indexOf("");
    if (index > -1) {
        data?.attributes.splice(index, 5);
        data?.order.splice(index, 5);
    }

    return data;
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