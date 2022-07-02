const jwt = require('jsonwebtoken');
const { config } = require('./config/config');

const secret = config.jwtSecret;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1NjYzNzc4NH0.Pa9YKm9TsB43PzxKtwajxzpyw0iHmu0kcYvPbCCvqHo';

function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
