module.exports = [
    {
        route   : 'dasbor',
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
        route   : 'data-master',
        title   : 'Data Master',
        icon    : 'archive',
        sub     : [
            {
                route   : 'mata-pelatihan',
                title   : 'Daftar Mata Pelatihan',
                plugin  : [

                ],
            },
            {
                route   : 'kelas',
                title   : 'Daftar Kelas',
                plugin  : [

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
        route   : 'pengguna',
        title   : 'Pengguna',
        icon    : 'users',
        plugin  : [
            'datatables',
            'select2',
        ],
        sub     : [
            {
                route   : 'instruktur',
                title   : 'Instriktur',
            },
            {
                route   : 'peserta-didik',
                title   : 'Peserta Didik',
            },
        ]
    }
];