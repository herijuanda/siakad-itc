module.exports = function(app) {
    const profil = require('../../controllers/lecturer/dasbor');
    app.get('/instruktur/dasbor', profil.index);

    const jadwal = require('../../controllers/lecturer/jadwal-mengajar');
    app.get('/instruktur/jadwal-mengajar', jadwal.index);
};