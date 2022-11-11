 # Step1 - Middleware
npm init

npm i express, morgan, dotenv, cookie-parser, express-session
npm i -D nodemon

# Step2 - Routing, nunjucks, bcrypt
npm i nunjucks
npm i bcrypt

# Step3 - Sequelize
npm i sequelize, sequelize-cli, mysql2
npx sequelize init

# 이외 명령어
* npm i - 전체 설치
* npm i -p - dependencies에 있는것만 설치 
* npm i -D - devdependencies에 있는 것만 설치

## Node 실습순서
* npm init 을 해주면 package.json파일이 생성 
* npm i express를해주면 node_modules과 packeage-lock.json이 생성

* 실행할때는 package json파일에서 mainname을 app.js로 맞추고 node app으로 실행, app.js이기때문에 이게 가능

* package.json파일에서 scripts부분에 "start": "nodemon app"을 추가하면 npm start로 실행가능

``` javascript
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app"
  }
```

* 위 과정을 거치면 app.js에서 ctrl + s를 통해 저장만 해도 자동 실행된다

* 미들웨어를 ,를 통해서 여러개 등록 가능
* 아래 예시코드처럼 throw를 통해 에러를 보내면 에러미들웨어로 이동한다

```javascript
app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
    // res.send('Hello, Express Upload');
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
```

* 인자가 4개면 에러미들웨어다

```javascript
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
})
```

* next함수를 통해서 다음 미들웨어로 넘어가고 res.send를 하면 next를 이용하여 다음 미들웨어로 넘기지않아도 된다
* 즉 app.get 콜백함수안에 next가 존재하지않았다면 다음 미들웨어인 "에러는 에러 처리 미들웨어로 갑니다." 부분을 보여주지않는다

## Node morgan, cookie-parser, express-session 설치 
* npm i morgan cookie-parser express-session dotenv