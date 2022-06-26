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

module.exports.date = function(data) {
    const value = data?.split('-');
    return value?.[2]+'-'+value?.[1]+'-'+value?.[0];
};

module.exports.datetime = function(data) {
    const value = data.split(', ');
    const date  = value?.[0].split('-');
    const time  = value?.[1].split(':');
    
    return date?.[2]+'-'+date?.[1]+'-'+date?.[0]+' '+time?.[0]+':'+time?.[1]+':00.000000';
};

module.exports.encrypt = function(text) {
    const CryptoJS = require('crypto-js');
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

module.exports.decrypt = function(text) {
    const CryptoJS  = require('crypto-js');
    return CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8);
};

module.exports.value_character = function(value) {
    if (value > 90) {
        return { 
            charater    : 'A', 
            description : 'Istimewa',
        };
    } else if (value >= 78 && value <= 89) {
        return { 
            charater    : 'B', 
            description : 'Baik',
        };
    } else if (value >= 70 && value <= 77) {
        return { 
            charater    : 'C', 
            description : 'Cukup',
        };
    } else if (value >= 60 && value <= 69) {
        return { 
            charater    : 'D', 
            description : 'Kurang',
        };
    } else {
        return { 
            charater    : 'E', 
            description : 'Sangat Kurang',
        };
    }
};

module.exports.email_validate = function(text) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(text);
};