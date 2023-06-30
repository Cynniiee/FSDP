 // Reward Management - Offers (Cynthia)

const express = require('express');
const router = express.Router();

// The variable offerList is an array to store the data in memory.
let offerList = [];

// The post function is to add data into the list.
// Req = Request, Res = Response
router.post("/", (req, res) => {
    let data = req.body;
    offerList.push(data);
    // Response in json format.
    res.json(data);
});

// The get function is to list all the data.
router.get("/", (req, res) => {
    res.json(offerList);
});

module.exports = router;
