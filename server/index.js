const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req, res) => {
    res.send("EcoRide's server is now running.");
});

// Routes

// Reward Management - Offers (Cynthia)
const offerRoute = require('./routes/offers');
app.use("/offers", offerRoute);

// Events & Vouchers - Events (Zen)
const eventRoute = require('./routes/events');
app.use("/events", eventRoute);

// Product & order management (Jia yee)
const carRentalRoute = require('./routes/carrentals');
app.use("/carrentals", carRentalRoute);

const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {

    let port = process.env.APP_PORT;

    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});
