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