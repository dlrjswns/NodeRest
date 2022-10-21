const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');


dotenv.config();

const DIR = 'data/'

try {
fs.readdirSync(DIR);
} catch (error) {
fs.mkdirSync(DIR);
}




const app = express();
app.set('port', process.env.PORT || 3000);

app.use(
morgan('dev'),
express.json(),
express.urlencoded({ extended: false }),
cookieParser(process.env.COOKIE_SECRET),
session({
resave: false,
saveUninitialized: false,
secret: process.env.COOKIE_SECRET,
cookie: {
httpOnly: true,
secure: false
},
name: 'session-cookie'
}));

//
const upload = multer({
storage: multer.diskStorage({
destination(req, file, done) {
done(null, DIR);
},
filename(req, file, done) {
const ext = path.extname(file.originalname);
done(null, `${req.body.id}${ext}`);
}
})
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', (_, res) => res.redirect(301, '/index.html'));

// upload폴더에 post방식일때
// body의 key가 이미지다.
app.post('/upload', upload.single('image'), (req, res) => {
console.log(req.file);
res.send(req.body.id);
});

app.listen(app.get('port'), () => console.log(app.get('port'), '번 포트에서 대기 중'));