const authController = require('express').Router();
const { login, refreshToken } = require('../service/auth.service');


authController.post('/login', login);
authController.get('/refresh-token', refreshToken);

module.exports = {
    authController
}