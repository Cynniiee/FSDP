const express = require('express');
const router = express.Router();
let eventList = [];
router.post("/", (req, res) => {
let data = req.body;
eventList.push(data);
res.json(data);
});
router.get("/", (req, res) => {
res.json(eventList);
});
module.exports = router;