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

module.exports.date_format = function(data) {
    const value = data?.split('-');
    return value?.[2]+'-'+value?.[1]+'-'+value?.[0];
};

// module.exports.money_format = function(angka, prefix) {
//     var number_string = angka.replace(/[^,\d]/g, '').toString(),
//     split   		= number_string.split(','),
//     sisa     		= split[0].length % 3,
//     rupiah     		= split[0].substr(0, sisa),
//     ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

//     if(ribuan){
//         separator = sisa ? '.' : '';
//         rupiah += separator + ribuan.join('.');
//     }

//     rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
//     return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
// };