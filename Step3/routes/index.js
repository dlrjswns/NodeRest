const express = require('express');
const { User, Info } = require('../models');

const router = express.Router();

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'description']
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/infos', async (req, res, next) => {
    try {
        const infos = await Info.findAll({});
        res.json(infos);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/data', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'description'],
            include: {
                model: Info
            }
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
