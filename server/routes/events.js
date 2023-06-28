const express = require('express');
const router = express.Router();
const { Event, Sequelize } = require('../models');
router.post("/", async (req, res) => {
    let data = req.body;
    let result = await Event.create(data);
    res.json(result);
});
router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { title: { [Sequelize.Op.like]: `%${search}%` } },
            { description: { [Sequelize.Op.like]: `%${search}%` } },
            { constraints: { [Sequelize.Op.like]: `%${search}%` } },
            { description: { [Sequelize.Op.like]: `%${search}%` } },
            { status: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }
    let list = await Event.findAll({
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});
module.exports = router;