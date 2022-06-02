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
        ],
    },
];