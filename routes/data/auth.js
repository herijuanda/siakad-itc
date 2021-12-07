module.exports = function(app) {
    const auth = require('../../controllers/auth');
    app.get('/', auth.index);
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
};