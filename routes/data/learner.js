module.exports = function(app) {
    const profil = require('../../controllers/learner/dasbor');
    app.get('/peserta-didik/dasbor', profil.index);

    const jadwal = require('../../controllers/learner/jadwal-pelatihan');
    app.get('/peserta-didik/jadwal-pelatihan', jadwal.index);

    const pembayaran = require('../../controllers/learner/pembayaran');
    app.get('/peserta-didik/pembayaran', pembayaran.index);

    const transkip = require('../../controllers/learner/transkip');
    app.get('/peserta-didik/transkip', transkip.index);

    const modul_pelatihan = require('../../controllers/learner/modul-pelatihan/index');
    app.get('/peserta-didik/modul-pelatihan', modul_pelatihan.index);
    app.post('/peserta-didik/modul-pelatihan', modul_pelatihan.data);

    const modul_pelatihan_detail = require('../../controllers/learner/modul-pelatihan/detail');
    app.get('/peserta-didik/modul-pelatihan/detail', modul_pelatihan_detail.index);
    app.post('/peserta-didik/modul-pelatihan/detail/baca', modul_pelatihan_detail.update_read);

    const modul_pelatihan_quiz = require('../../controllers/learner/modul-pelatihan/quiz');
    app.get('/peserta-didik/modul-pelatihan/detail/quiz', modul_pelatihan_quiz.index);
    app.post('/peserta-didik/modul-pelatihan/detail/quiz/mulai', modul_pelatihan_quiz.setup);
    app.post('/peserta-didik/modul-pelatihan/detail/quiz/next', modul_pelatihan_quiz.next);
    app.post('/peserta-didik/modul-pelatihan/detail/quiz/done', modul_pelatihan_quiz.done);
    app.get('/peserta-didik/modul-pelatihan/detail/quiz/result', modul_pelatihan_quiz.result);
};