const express = require('express');
const router = require('./src/routing/routing.js');
require('./src/db-connection/db-conn.js');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

const port = 3000;
app.listen(port, error => {
    if (error) {
        console.log("Error Occurred");
    } else {
        console.log(`Server is running on port ${port}`);
    }
})
