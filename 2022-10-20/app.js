const express = require('express');

const app = express();
app.set('port', 3000);

app.get('/upload', (req, res) => {
    res.send('Hello, Express Upload');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '빈 포트에서 대기 중');
});

