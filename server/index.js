const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());


// Simple Route
app.get("/", (req, res) => {
    res.send("EcoRide's server is now running.");
});

let port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`⚡ Sever running on http://localhost:${port}`);
});

