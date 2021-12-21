module.exports = function(app) {
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
    app.post('/admin/data-master/kelas/process', kelas.process);
    app.post('/admin/data-master/kelas/delete', kelas.delete);

    // PENGGUNA
    const instruktur = require('../../controllers/admin/pengguna/instruktur');
    app.get('/admin/pengguna/instruktur', instruktur.index);
    app.post('/admin/pengguna/instruktur', instruktur.data);
    app.post('/admin/pengguna/instruktur/form', instruktur.form);
    app.post('/admin/pengguna/instruktur/process', instruktur.process);
    app.post('/admin/pengguna/instruktur/delete', instruktur.process);

    const pembimbing_ojt = require('../../controllers/admin/pengguna/pembimbing-ojt');
    app.get('/admin/pengguna/pembimbing-ojt', pembimbing_ojt.index);
    app.post('/admin/pengguna/pembimbing-ojt', pembimbing_ojt.data);
    app.post('/admin/pengguna/pembimbing-ojt/form', pembimbing_ojt.form);
    app.post('/admin/pengguna/pembimbing-ojt/process', pembimbing_ojt.process);
    app.post('/admin/pengguna/pembimbing-ojt/delete', pembimbing_ojt.process);


    const peserta_didik = require('../../controllers/admin/pengguna/peserta-didik');
    app.get('/admin/pengguna/peserta-didik', peserta_didik.index);
    app.post('/admin/pengguna/peserta-didik', peserta_didik.data);
};