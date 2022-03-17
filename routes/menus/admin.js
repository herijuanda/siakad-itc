module.exports = [
    {
        module  : 'dasbor',
        route   : 'dasbor',
        path    : 'admin/dasbor',
        title   : 'Dasbor',
        icon    : 'grid',
        plugin  : [

        ],
    },
    // {
    //     route   : 'semester',
    //     title   : 'Pengaturan Semester',
    //     icon    : 'file-text',
    //     plugin  : [

    //     ],
    // },
    {
        module  : 'data-master',
        route   : 'data-master',
        title   : 'Data Master',
        icon    : 'archive',
        sub     : [
            {
                module  : 'data-master',
                route   : 'prodi',
                path    : 'admin/data-master/prodi',
                title   : 'Daftar Prodi',
                plugin  : [
                    'datatables',
                    'select2',
                    'input_number',
                ],
            },
            {
                module  : 'data-master',
                route   : 'mata-pelatihan',
                path    : 'admin/data-master/mata-pelatihan',
                title   : 'Daftar Mata Pelatihan',
                plugin  : [
                    'datatables',
                    'select2',
                ],
            },
            {
                module  : 'data-master',
                route   : 'kelas',
                path    : 'admin/data-master/kelas',
                title   : 'Daftar Kelas',
                plugin  : [
                    'datatables',
                    'select2',
                ],
            },
        ]
    },
    // {
    //     route   : 'daftar-nilai',
    //     title   : 'Daftar Nilai',
    //     icon    : 'hash',
    //     plugin  : [

    //     ],
    // },
    {
        module  : 'pengguna',
        route   : 'pengguna',
        title   : 'Pengguna',
        icon    : 'users',
        sub     : [
            {
                module  : 'pengguna',
                route   : 'instruktur',
                path    : 'admin/pengguna/instruktur',
                title   : 'Instruktur',
                plugin  : [
                    'datatables',
                    'select2',
                    'flatpickr',
                ],
            },
            {
                module  : 'pengguna',
                route   : 'pembimbing-ojt',
                path    : 'admin/pengguna/pembimbing-ojt',
                title   : 'Pembimbing OJT',
                plugin  : [
                    'datatables',
                    'select2',
                    // 'flatpickr',
                ],
            },
            {
                module  : 'pengguna',
                route   : 'peserta-didik',
                path    : 'admin/pengguna/peserta-didik',
                title   : 'Peserta Didik',
                plugin  : [
                    'datatables',
                    'select2',
                    'flatpickr',
                ],
            },
        ]
    },
];

module.exports.detail = {
    kelas : [
        {
            module  : 'data-master',
            parent  : 'kelas',
            route   : false,
            path    : 'admin/data-master/kelas/detail/peserta-didik',
            title   : 'Peserta Didik',
            plugin  : [
                'datatables',
                'select2',
            ],
        },
        {
            module  : 'data-master',
            parent  : 'kelas',
            route   : false,
            path    : 'admin/data-master/kelas/detail/jadwal',
            title   : 'Penjadwalan',
            plugin  : [
                'datatables',
                'select2',
                'flatpickr',
            ],
        }
    ],
}