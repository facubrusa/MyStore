const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { config } = require('../config/config');

const UserService = require('../services/user.service');
const service = new UserService();

class AuthService {

    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if(!user) {
            throw new boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        };
        const token = jwt.sign(payload, config.jwtSecret);
        return token;
    }

    async sendRecovery(email) {
        const user = await service.findByEmail(email);
        if(!user) {
            throw new boom.unauthorized();
        }
        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
        await service.update(user.id, {recoveryToken: token});
        const link = `https://mysite.com/recovery?token=${token}`;
        const body = {
            from: 'facundobrusa11@gmail.com',
            to: user.email,
            subject: 'Recovery password',
            html: `<b>Enter on this site for recovery password: ${link}</b>`,
        };

        const response = await this.sendMail(body);
        return response;
    }

    async changePassword(token, newPassword) {
        try {
            const payload = jwt.verify(token, config.jwtSecret);
            // if(!payload) {
            //     throw new boom.unauthorized();
            // }
            const user = await service.findOne(payload.sub);
            if(user.recoveryToken !== token) {
                throw boom.unauthorized();
            }
            const hash = await bcrypt.hash(newPassword, 10);
            await service.update(user.id, {recoveryToken: null, password: hash});
            return { error: false, message: 'Password changed'};
        } catch (error) {
            throw boom.unauthorized();
        }

    }

    async sendMail(body) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config.email,
                pass: config.emailPassword
            }
        });

        await transporter.sendMail(body);

        return { error: false, message: 'Mail sent'};
    }
}

module.exports = AuthService;
