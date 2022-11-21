const express = require('express');
const Info = require('../models/info');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.locals.title = require('../package.json').name;
        res.render('info');
    })
    .post(async (req, res, next) => {
        const { userId, address, phoneNum } = req.body;

        try {
            await Info.create({ userId, address, phoneNum });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
