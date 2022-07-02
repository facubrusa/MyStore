const express = require('express');
const passport = require('passport');

const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    updateUserSchema,
    createUserSchema,
    getUserSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
    try {
        const users = await service.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await service.findOne(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.create(body);
            res.status(201).json({
                message: 'User created',
                data: newUser,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await service.update(id, body);
            res.status(201).json({
                message: 'User updated',
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({
                message: 'User deleted',
                data: {
                    id
                },
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
