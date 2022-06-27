module.exports = [
    {
        module  : 'dasbor',
        route   : 'dasbor',
        path    : 'mentor/dasbor',
        title   : 'Profil',
        icon    : 'user',
        plugin  : [

        ],
    },
    {
        module  : 'logbook',
        route   : 'logbook',
        path    : 'mentor/logbook',
        title   : 'Log Book',
        icon    : 'book',
        plugin  : [
            'datatables',
            'flatpickr',
            'moment',
        ],
    },
];