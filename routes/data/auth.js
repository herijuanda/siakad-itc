module.exports = function(app) {
    const login = require('../../controllers/auth/login');
    app.get('/', login.index);
    app.post('/login', login.process);
    app.post('/logout', login.logout);
    
    const register = require('../../controllers/auth/register');
    app.get('/register', register.index);
    app.post('/register/process', register.process);
};