module.exports.base_url = (req) => {
    return req.protocol + '://' + req.headers.host
}

module.exports.route_now = (req) => {
    const url = require('url') ;
    return url.parse(req.url).pathname;
}

module.exports.auth = (req, res) => {
    const _level = req.url.split("/")[1];
    if( !req.session?.id || (_level != req.session?.role_slug ) ) {
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
    if (data) {
        const value = data.split(', ');
        const date  = value?.[0]?.split('-');
        const time  = value?.[1]?.split(':');
        
        return date?.[2]+'-'+date?.[1]+'-'+date?.[0]+' '+time?.[0]+':'+time?.[1]+':00.000000';
    }

    return null;
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

module.exports.english_transleted = {
    school_year_id: 'Tahun Ajaran',
    study_program_id: 'Prodi',
    subject_id: 'Mata Pelatihan',
    name: 'Nama',
    register_number: 'Nomor Register',
    place_of_birth: 'Tempat Lahir',
    date_of_birth: 'Tanggal Lahir',
    genre_id: 'Jenis Kelamin',
    religion: 'Agama',
    address: 'Alamat',
    postal_code: 'Kode Pos',
    phone_number: 'Nomor HP',
    parent_name: 'Nama Orang Tua',
    parent_job: 'Pekerjaan Orang Tua',
    parent_phone_number: 'Nomor HP Orang Tua',
    parent_address: 'Alamat Orang Tua',
    parent_postal_code: 'Kode Post Orang Tua',
    email: 'Email',
    password: 'Password',
    password_confirmation: 'Konfirmasi Password',
    last_education: 'Pendidikan Terakhir',
    educational_institution: 'Instansi Pendidikan',
    graduation_year: 'Tahun Lulus',
    gender_id: 'Jenis Kelamin',
    major_program: 'Program Jurusan',
    learner_id: 'Peserta Didik',
    lecturer_id: 'Instruktur',
    mentor_id: 'Pembimbing OJT',
    value: 'Nilai',
    description: 'Keterangan',
    day_id: 'Hari',
    datetime: 'Waktu',
    date: 'Tanggal',
    time: 'Waktu',
    time_in: 'Waktu Masuk',
    time_out: 'Waktu Keluar',
    note: 'Catatan',
    notes: 'Catatan',
    cost: 'Biaya',
    step: 'Tahap',
    code: 'Kode',
    room: 'Ruangan',
    event: 'Kegiatan',
    problem: 'Kendala',
}