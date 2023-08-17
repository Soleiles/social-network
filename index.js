const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Runs server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});