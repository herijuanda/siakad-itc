module.exports = function(app) {
    const upload = require('../../helpers/upload');    

    const profil = require('../../controllers/lecturer/dasbor');
    app.get('/instruktur/dasbor', profil.index);

    const jadwal = require('../../controllers/lecturer/jadwal-mengajar');
    app.get('/instruktur/jadwal-mengajar', jadwal.index);

    // KELAS MENGAJAR
    const daftar_nilai_kelas = require('../../controllers/lecturer/kelas-mengajar/daftar-nilai/kelas');
    app.get('/instruktur/kelas-mengajar/daftar-nilai/kelas', daftar_nilai_kelas.index);
    app.post('/instruktur/kelas-mengajar/daftar-nilai/kelas', daftar_nilai_kelas.data);

    const daftar_nilai_peserta_didik = require('../../controllers/lecturer/kelas-mengajar/daftar-nilai/peserta-didik');
    app.get('/instruktur/kelas-mengajar/daftar-nilai/kelas/peserta-didik', daftar_nilai_peserta_didik.index);
    app.post('/instruktur/kelas-mengajar/daftar-nilai/kelas/peserta-didik', daftar_nilai_peserta_didik.data);
    app.post('/instruktur/kelas-mengajar/daftar-nilai/kelas/peserta-didik/update-nilai', daftar_nilai_peserta_didik.update_nilai);

    const modul_pelatihan = require('../../controllers/lecturer/kelas-mengajar/modul-pelatihan');
    app.get('/instruktur/kelas-mengajar/modul-pelatihan', modul_pelatihan.index);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan', modul_pelatihan.data);

    const modul_pelatihan_modul = require('../../controllers/lecturer/kelas-mengajar/modul-pelatihan/modul');
    app.get('/instruktur/kelas-mengajar/modul-pelatihan/modul', modul_pelatihan_modul.index);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/modul', modul_pelatihan_modul.data);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/modul/form', modul_pelatihan_modul.form);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/modul/process', upload('modules').single("file"), modul_pelatihan_modul.process);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/modul/delete', modul_pelatihan_modul.delete);

    const modul_pelatihan_kuis = require('../../controllers/lecturer/kelas-mengajar/modul-pelatihan/kuis');
    app.get('/instruktur/kelas-mengajar/modul-pelatihan/kuis', modul_pelatihan_kuis.index);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/kuis', modul_pelatihan_kuis.data);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/kuis/form', modul_pelatihan_kuis.form);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/kuis/process', upload('modules').single("file"), modul_pelatihan_kuis.process);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/kuis/delete', modul_pelatihan_kuis.delete);

    const student_record_sheet = require('../../controllers/lecturer/student-record-sheet');
    app.get('/instruktur/student-record-sheet', student_record_sheet.index);
    app.post('/instruktur/student-record-sheet', student_record_sheet.data);
    app.post('/instruktur/student-record-sheet/form', student_record_sheet.form);
    app.post('/instruktur/student-record-sheet/select-classes', student_record_sheet.select_classes);
    app.post('/instruktur/student-record-sheet/select-learner', student_record_sheet.select_learner);
    app.post('/instruktur/student-record-sheet/process', student_record_sheet.process);
    app.post('/instruktur/student-record-sheet/delete', student_record_sheet.delete);

    const logbook = require('../../controllers/lecturer/logbook');
    app.get('/instruktur/logbook', logbook.index);
    app.post('/instruktur/logbook', logbook.data);
    
};