module.exports = function(app) {
    const upload = require('../../helpers/upload');    

    const dasbor = require('../../controllers/admin/dasbor');
    app.get('/admin/dasbor', dasbor.index);

    // DATA MASTER
    const prodi = require('../../controllers/admin/master/prodi');
    app.get('/admin/data-master/prodi', prodi.index);
    app.post('/admin/data-master/prodi', prodi.data);
    app.post('/admin/data-master/prodi/form', prodi.form);
    app.post('/admin/data-master/prodi/process', prodi.process);
    app.post('/admin/data-master/prodi/delete', prodi.delete);

    const mata_pelatihan = require('../../controllers/admin/master/mata-pelatihan');
    app.get('/admin/data-master/mata-pelatihan', mata_pelatihan.index);
    app.post('/admin/data-master/mata-pelatihan', mata_pelatihan.data);
    app.post('/admin/data-master/mata-pelatihan/form', mata_pelatihan.form);
    app.post('/admin/data-master/mata-pelatihan/process', mata_pelatihan.process);
    app.post('/admin/data-master/mata-pelatihan/delete', mata_pelatihan.delete);

    const kelas = require('../../controllers/admin/master/kelas');
    app.get('/admin/data-master/kelas', kelas.index);
    app.post('/admin/data-master/kelas', kelas.data);
    app.post('/admin/data-master/kelas/form', kelas.form);
    app.post('/admin/data-master/kelas/select-subject', kelas.select_subject);
    app.post('/admin/data-master/kelas/process', kelas.process);
    app.post('/admin/data-master/kelas/delete', kelas.delete);

    const kelas_peserta_didik = require('../../controllers/admin/master/kelas/peserta-didik');
    app.get('/admin/data-master/kelas/peserta-didik', kelas_peserta_didik.index);
    app.post('/admin/data-master/kelas/peserta-didik', kelas_peserta_didik.data);
    app.post('/admin/data-master/kelas/peserta-didik/form', kelas_peserta_didik.form);
    app.post('/admin/data-master/kelas/peserta-didik/process', kelas_peserta_didik.process);
    app.post('/admin/data-master/kelas/peserta-didik/delete', kelas_peserta_didik.delete);

    const kelas_jadwal = require('../../controllers/admin/master/kelas/jadwal');
    app.get('/admin/data-master/kelas/jadwal', kelas_jadwal.index);
    app.post('/admin/data-master/kelas/jadwal', kelas_jadwal.data);
    app.post('/admin/data-master/kelas/jadwal/form', kelas_jadwal.form);
    app.post('/admin/data-master/kelas/jadwal/process', kelas_jadwal.process);
    app.post('/admin/data-master/kelas/jadwal/delete', kelas_jadwal.delete);

    // PENGGUNA
    const instruktur = require('../../controllers/admin/pengguna/instruktur');
    app.get('/admin/pengguna/instruktur', instruktur.index);
    app.post('/admin/pengguna/instruktur', instruktur.data);
    app.post('/admin/pengguna/instruktur/form', instruktur.form);
    app.post('/admin/pengguna/instruktur/process', instruktur.process);
    app.post('/admin/pengguna/instruktur/delete', instruktur.delete);

    const pembimbing_ojt = require('../../controllers/admin/pengguna/pembimbing-ojt');
    app.get('/admin/pengguna/pembimbing-ojt', pembimbing_ojt.index);
    app.post('/admin/pengguna/pembimbing-ojt', pembimbing_ojt.data);
    app.post('/admin/pengguna/pembimbing-ojt/form', pembimbing_ojt.form);
    app.post('/admin/pengguna/pembimbing-ojt/process', pembimbing_ojt.process);
    app.post('/admin/pengguna/pembimbing-ojt/delete', pembimbing_ojt.delete);

    const peserta_didik = require('../../controllers/admin/pengguna/peserta-didik');
    app.get('/admin/pengguna/peserta-didik', peserta_didik.index);
    app.post('/admin/pengguna/peserta-didik', peserta_didik.data);
    app.post('/admin/pengguna/peserta-didik/form', peserta_didik.form);
    app.post('/admin/pengguna/peserta-didik/process', peserta_didik.process);


    // PEMBAYARAN

    const pembayaran = require('../../controllers/admin/pembayaran');
    app.get('/admin/pembayaran', pembayaran.index);
    app.post('/admin/pembayaran', pembayaran.data);
    app.post('/admin/pembayaran/form', pembayaran.form);
    app.post('/admin/pembayaran/process', upload('payments').single("file"), pembayaran.process);
    app.post('/admin/pembayaran/delete', pembayaran.delete);

    // PENGATURAN OJT

    const pengaturan_ojt = require('../../controllers/admin/pengaturan-ojt');
    app.get('/admin/pengaturan-ojt', pengaturan_ojt.index);
    app.post('/admin/pengaturan-ojt', pengaturan_ojt.data);
    app.post('/admin/pengaturan-ojt/form', pengaturan_ojt.form);
    app.post('/admin/pengaturan-ojt/process', pengaturan_ojt.process);
    app.post('/admin/pengaturan-ojt/delete', pengaturan_ojt.delete);

    // STUDENT RECORD SHEET

    const student_record_sheet = require('../../controllers/admin/student-record-sheet');
    app.get('/admin/student-record-sheet', student_record_sheet.index);
    app.post('/admin/student-record-sheet', student_record_sheet.data);
    app.post('/admin/student-record-sheet/form', student_record_sheet.form);
    app.post('/admin/student-record-sheet/process', student_record_sheet.process);
    app.post('/admin/student-record-sheet/delete', student_record_sheet.delete);
};