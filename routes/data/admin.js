module.exports = function(app) {
    const dasbor = require('../../controllers/admin/dasbor');
    app.get('/admin/dasbor', dasbor.index);

    const pengguna = require('../../controllers/admin/pengguna');
    app.get('/admin/pengguna', pengguna.index);
    app.post('/admin/pengguna', pengguna.data);
    app.post('/admin/pengguna/form', pengguna.form);
    app.post('/admin/pengguna/process', pengguna.process);
};