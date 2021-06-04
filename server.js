const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send(
        [
            {
                'id':1,
                'image': 'https://placeimg.com/64/64/1',
                'name':'홍길이',
                'birthday':'961222',
                'gender':'남자',
                'job':'대학생',
              },
              {
                'id':2,
                'image': 'https://placeimg.com/64/64/2',
                'name':'숫돌이',
                'birthday':'200101',
                'gender':'남자',
                'job':'고딩',
              },
              {
                'id':3,
                'image': 'https://placeimg.com/64/64/3',
                'name':'나대주',
                'birthday':'900423',
                'gender':'여자',
                'job':'직장인',
              },
        ]
    );
});

app.listen(port, ()=> console.log(`listening on port ${port}`));