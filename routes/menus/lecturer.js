module.exports = [
    {
        module  : 'dasbor',
        route   : 'dasbor',
        path    : 'lecturer/dasbor',
        title   : 'Profil',
        icon    : 'user',
        plugin  : [

        ],
    },
    {
        module  : 'jadwal-mengajar',
        route   : 'jadwal-mengajar',
        path    : 'lecturer/jadwal-mengajar',
        title   : 'Jadwal Mengajar',
        icon    : 'clock',
        plugin  : [

        ],
    },
    {
        module  : 'kelas-mengajar',
        route   : 'kelas-mengajar',
        // path    : 'lecturer/kelas-mengajar',
        title   : 'Kelas Mengajar',
        icon    : 'box',
        sub     : [
            {
                module  : 'kelas-mengajar',
                route   : 'daftar-nilai',
                path    : 'lecturer/kelas-mengajar/daftar-nilai/kelas',
                title   : 'Daftar Nilai',
                plugin  : [
                    'datatables',
                    // 'select2',
                    // 'flatpickr',
                ],
            },
            {
                module  : 'kelas-mengajar',
                route   : 'modul-pelatihan',
                path    : 'lecturer/kelas-mengajar/modul-pelatihan',
                title   : 'Modul Pelatihan',
                plugin  : [
                    'datatables',
                    'select2',
                    // 'flatpickr',
                ],
            },
            // {
            //     module  : 'kelas-mengajar',
            //     route   : 'student-record-sheet',
            //     path    : 'lecturer/kelas-mengajar/student-record-sheet',
            //     title   : 'Student Record Sheet',
            //     plugin  : [
            //         'datatables',
            //         'select2',
            //         'flatpickr',
            //         'moment',
            //     ],
            // },
            // {
            //     module  : 'kelas-mengajar',
            //     route   : 'logbook-ojt',
            //     path    : 'lecturer/kelas-mengajar/logbook-ojt',
            //     title   : 'Log Book OJT',
            //     plugin  : [
            //         'datatables',
            //         'select2',
            //         'flatpickr',
            //     ],
            // },
        ]
    },
    {
        module  : 'student-record-sheet',
        route   : 'student-record-sheet',
        path    : 'lecturer/student-record-sheet',
        title   : 'Student Record Sheet',
        icon    : 'book-open',
        plugin  : [
            'datatables',
            'select2',
            'flatpickr',
            'moment',
        ],
    },
    {
        module  : 'logbook',
        route   : 'logbook',
        path    : 'lecturer/logbook',
        title   : 'Log Book',
        icon    : 'book',
        plugin  : [
            'datatables',
            'flatpickr',
            'moment',
        ],
    },
];

module.exports.detail = {
    daftar_nilai : [
        {
            module  : 'kelas-mengajar',
            parent  : 'daftar-nilai',
            route   : false,
            path    : 'lecturer/kelas-mengajar/daftar-nilai/peserta-didik',
            title   : 'Peserta Didik',
            plugin  : [
                'datatables',
                // 'select2',
            ],
        },
    ],
    modul_pelatihan : [
        {
            module  : 'kelas-mengajar',
            parent  : 'modul-pelatihan',
            route   : false,
            path    : 'lecturer/kelas-mengajar/modul-pelatihan/modul',
            title   : 'Modul',
            plugin  : [
                'datatables',
                // 'select2',
            ],
        },
        {
            module  : 'kelas-mengajar',
            parent  : 'modul-pelatihan',
            route   : false,
            path    : 'lecturer/kelas-mengajar/modul-pelatihan/kuis',
            title   : 'Kuis',
            plugin  : [
                'datatables',
                // 'select2',
            ],
        },
    ],
}