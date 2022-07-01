module.exports = function(app) {
    const upload = require('../../helpers/upload');    

    const profil = require('../../controllers/learner/dasbor');
    app.get('/peserta-didik/dasbor', profil.index);

    const jadwal = require('../../controllers/learner/jadwal-pelatihan');
    app.get('/peserta-didik/jadwal-pelatihan', jadwal.index);

    const pembayaran = require('../../controllers/learner/pembayaran');
    app.get('/peserta-didik/pembayaran', pembayaran.index);

    const transkrip = require('../../controllers/learner/transkrip');
    app.get('/peserta-didik/transkrip', transkrip.index);

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

    const student_record_sheet = require('../../controllers/learner/student-record-sheet');
    app.get('/peserta-didik/student-record-sheet', student_record_sheet.index);
    app.post('/peserta-didik/student-record-sheet', student_record_sheet.data);

    const logbook = require('../../controllers/learner/logbook');
    app.get('/peserta-didik/logbook', logbook.index);
    app.post('/peserta-didik/logbook', logbook.data);
    app.post('/peserta-didik/logbook/form', logbook.form);
    app.post('/peserta-didik/logbook/process', upload('logbooks').single("file"), logbook.process);
    app.post('/peserta-didik/logbook/delete', logbook.delete);
};