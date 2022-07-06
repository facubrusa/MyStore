const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');

const AuthService = require('../services/auth.service');
const service = new AuthService();

const router = express.Router();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            const token = service.signToken(user);
            res.json({
                user,
                token
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/recovery',
    async (req, res, next) => {
        try {
            const { email } = req.body;
            if(!email) {
                throw new boom.badRequest("email required");
            }
            const response = await service.sendRecovery(email);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/change-password',
    async (req, res, next) => {
        try {
            const { token, newPassword } = req.body;
            if(!token || !newPassword) {
                throw new boom.badRequest("token and new password required");
            }
            const response = await service.changePassword(token, newPassword);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
