module.exports = function(app) {
    const profil = require('../../controllers/learner/dasbor');
    app.get('/peserta-didik/dasbor', profil.index);

    const jadwal = require('../../controllers/learner/jadwal-pelatihan');
    app.get('/peserta-didik/jadwal-pelatihan', jadwal.index);

    const pembayaran = require('../../controllers/learner/pembayaran');
    app.get('/peserta-didik/pembayaran', pembayaran.index);

    const transkip = require('../../controllers/learner/transkip');
    app.get('/peserta-didik/transkip', transkip.index);
};