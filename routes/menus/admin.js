module.exports = [
    {
        module  : 'dasbor',
        route   : 'dasbor',
        path    : 'dasbor',
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
                path    : 'data-master/prodi',
                title   : 'Daftar Prodi',
                plugin  : [
                    'datatables',
                    'select2',
                ],
            },
            {
                module  : 'data-master',
                route   : 'mata-pelatihan',
                path    : 'data-master/prodi',
                title   : 'Daftar Mata Pelatihan',
                plugin  : [
                    'datatables',
                    'select2',
                ],
            },
            {
                module  : 'data-master',
                route   : 'kelas',
                path    : 'data-master/prodi',
                title   : 'Daftar Kelas',
                plugin  : [
                    'datatables',
                    // 'select2',
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
                path    : 'pengguna/instruktur',
                title   : 'Instruktur',
                plugin  : [
                    'datatables',
                    'select2',
                ],
            },
            {
                module  : 'pengguna',
                route   : 'pembimbing-ojt',
                path    : 'pengguna/pembimbing-ojt',
                title   : 'Pembimbing OJT',
                plugin  : [
                    'datatables',
                    'select2',
                ],
            },
            {
                module  : 'pengguna',
                route   : 'peserta-didik',
                path    : 'pengguna/peserta-didik',
                title   : 'Peserta Didik',
                plugin  : [
                    'datatables',
                    'select2',
                ],
            },
        ]
    }
];