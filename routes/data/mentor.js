module.exports = function(app) {

    const profil = require('../../controllers/mentor/dasbor');
    app.get('/pembimbing-ojt/dasbor', profil.index);

    const logbook = require('../../controllers/mentor/logbook');
    app.get('/pembimbing-ojt/logbook', logbook.index);
    app.post('/pembimbing-ojt/logbook', logbook.data);
    app.post('/pembimbing-ojt/logbook/approval', logbook.approval);
    app.post('/pembimbing-ojt/logbook/update-score', logbook.update_score);
};