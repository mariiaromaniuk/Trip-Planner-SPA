const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
    let err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err);
    res.send("Something went wrong: " + err.message);
});

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`Server is listening on port: ${PORT}`);
});