const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlendoded({ extended:  true }));

app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(proess.env.MONGODB_URI || 'mongodb://localhost/apisocialnet', {
    useFindandModify: false,
    useUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));