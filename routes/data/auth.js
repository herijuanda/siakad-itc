module.exports = function(app) {
    const auth = require('../../controllers/auth');
    app.get('/', auth.index);
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
    app.get('/logout', auth.logout);
    
    app.get('/register', auth.register);
    app.post('/register/process', auth.register_proccess);
};