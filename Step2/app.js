const path = require('path');

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nunjucks = require('nunjucks');

const infoRouter = require('./routes/info');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), { // numjucks를 이런식으로 설정한 순간 res에 locals를 사용할 수 있게 된다.
    express: app,
    watch: true
});

app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);

app.use('/info', infoRouter);

app.use((req, res, next) => {
    next('Not found error!')


});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
