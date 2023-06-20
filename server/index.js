const express = require('express');
const app = express();

// Simple Route
app.get("/", (req, res) => {
    res.send("EcoRide's server is now running.");
});

let port = 3001;
app.listen(port, () => {
    console.log(`⚡ Sever running on http://localhost:${port}`);
});