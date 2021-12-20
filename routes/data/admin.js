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

    // PENGGUNA
    const instruktur = require('../../controllers/admin/pengguna/instruktur');
    app.get('/admin/pengguna/instruktur', instruktur.index);
    app.post('/admin/pengguna/instruktur', instruktur.data);
    app.post('/admin/pengguna/instruktur/form', instruktur.form);
    app.post('/admin/pengguna/instruktur/process', instruktur.process);
    app.post('/admin/pengguna/instruktur/delete', instruktur.process);

    const peserta_didik = require('../../controllers/admin/pengguna/peserta-didik');
    app.get('/admin/pengguna/peserta-didik', peserta_didik.index);
    app.post('/admin/pengguna/peserta-didik', peserta_didik.data);
};