module.exports = [
    {
        module  : 'dasbor',
        route   : 'dasbor',
        path    : 'learner/dasbor',
        title   : 'Profil',
        icon    : 'book',
        plugin  : [

        ],
    },
    {
        module  : 'jadwal-pelatihan',
        route   : 'jadwal-pelatihan',
        path    : 'learner/jadwal-pelatihan',
        title   : 'Jadwal Pelatihan',
        icon    : 'clock',
        plugin  : [

        ],
    },
    {
        module  : 'pembayaran',
        route   : 'pembayaran',
        path    : 'learner/pembayaran',
        title   : 'Informasi Pembayaran',
        icon    : 'book-open',
        plugin  : [

        ],
    },
    {
        module  : 'transkip',
        route   : 'transkip',
        path    : 'learner/transkip',
        title   : 'Transkip',
        icon    : 'clipboard',
        plugin  : [

        ],
    },
    {
        module  : 'modul-pelatihan',
        route   : 'modul-pelatihan',
        path    : 'learner/modul-pelatihan',
        title   : 'Modul Pelatihan & Kuis',
        icon    : 'clipboard',
        plugin  : [
            'datatables',
            'encrypt_decrypt'
        ],
    },
    {
        module  : 'student-record-sheet',
        route   : 'student-record-sheet',
        path    : 'learner/student-record-sheet',
        title   : 'Student Record Sheet',
        icon    : 'book-open',
        plugin  : [
            'datatables',
            // 'select2',
            'flatpickr',
            'moment',
        ],
    },
];

module.exports.detail = {
    modul_pelatihan : 
        {
            module  : 'modul-pelatihan',
            parent  : 'modul-pelatihan',
            route   : false,
            path    : 'learner/modul-pelatihan/detail',
            title   : 'Detail',
            plugin  : [
                // 'datatables',
                // 'select2',
            ],
            quiz : {
                module  : 'modul-pelatihan',
                parent  : 'modul-pelatihan',
                route   : false,
                path    : 'learner/modul-pelatihan/quiz',
                title   : 'Quiz',
                plugin  : [
                    // 'datatables',
                    // 'select2',
                ],
            },
            result : {
                module  : 'modul-pelatihan',
                parent  : 'modul-pelatihan',
                route   : false,
                path    : 'learner/modul-pelatihan/quiz/result',
                title   : 'Quiz',
                plugin  : [
                    // 'datatables',
                    // 'select2',
                ],
            },
        }
    ,
}