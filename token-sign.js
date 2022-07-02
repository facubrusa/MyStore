const jwt = require('jsonwebtoken');
const { config } = require('./config/config');

const secret = config.jwtSecret;
const payload = {
    sub: 1,
    role: 'customer'
};

function signToken(payload, secret) {
    return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
