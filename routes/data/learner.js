module.exports = function(app) {
    const profil = require('../../controllers/learner/dasbor');
    app.get('/peserta-didik/dasbor', profil.index);
};