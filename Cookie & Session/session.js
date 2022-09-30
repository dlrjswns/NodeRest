const session = {};
const http = require('http');
const fs= require('fs').promises;
const url = require('url');
const qs = require('querystring');

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
        console.log('앙4');
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        
        const uniqueInt = Date.now();
        session[uniqueInt] = {
            name,
            expires
        };

        res.writeHead(302, {
            Location: '/',
            'Set-Cookie':
            `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    }
        else if (cookies.session && session[cookies.session] && session[cookies.session].expires > Date.now()) {
            console.log('앙3');
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`${session[cookies.session].name}님 안녕하세요`);
        } else {
            try {
                const data = await fs.readFile('./cookie.html');
                console.log('앙2');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            } catch(err) {
                console.log('앙1');
                res.writeHead(500,{ 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(err.message);
            }
        }
    })
        .listen(8085, () => {
            console.log('8085번 포트에서 서버 대기 중입니다!');
        });