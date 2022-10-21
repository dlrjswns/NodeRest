const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

// morgan('dev')의 리턴값은 req, res, next를 인자로 받는 콜백함수일 것이다
// app.use의 첫번째 인자에 경로값을 전달한다면 이는 그 경로에 해당하는 경우에만 진행하고 그렇지 않을 경우 다음 미들웨어로 이동
// .env파일엔 비밀값들을 기록해두기에 Git에는 되도록이면 올리지않는다

dotenv.config(); // 이 함수를 호출하는 순간 process객체에 .env속성을 만들어줌으로써 .env파일에 COOKIE_SECRET값을 가져오게된다
const app = express();
app.set('port', 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
    // res.send('Hello, Express Upload');
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '빈 포트에서 대기 중');
});

