module.exports = function(app) {
    const profil = require('../../controllers/lecturer/dasbor');
    app.get('/instruktur/dasbor', profil.index);
};