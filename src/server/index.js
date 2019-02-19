const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));

const articlesRoute = require('./v1/articles');
const tagsRoute = require('./v1/tags');

app.use('/api/v1/articles', articlesRoute);
app.use('/api/v1/tags', tagsRoute);

app.get('/api/v1/username', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(8080, () => console.log('Listening on port 8080!'));
