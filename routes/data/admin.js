module.exports = function(app) {
    const dasbor = require('../../controllers/admin/dasbor');
    app.get('/admin/dasbor', dasbor.index);

    const pengguna = require('../../controllers/admin/pengguna');
    app.get('/admin/pengguna/:sub', pengguna.index);
    app.post('/admin/pengguna/:sub', pengguna.data);
    app.post('/admin/pengguna/:sub/form', pengguna.form);
    app.post('/admin/pengguna/:sub/process', pengguna.process);
};