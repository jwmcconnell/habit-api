const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/v1/habits', require('./routes/habits'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
