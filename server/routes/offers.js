// Reward Management - Offers (Cynthia)

const express = require('express');
const router = express.Router();

const { Offers, Sequelize } = require('../models');

// The post function is to add data into the list.
// Req = Request, Res = Response
router.post("/", async (req, res) => {
    let data = req.body;
    let result = await Offers.create(data);
    // Response in JSON format
    res.json(result);
});

// The get function is to list all the data.
router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { brandName: { [Sequelize.Op.like]: `%${search}%` } },
            { offerTitle: { [Sequelize.Op.like]: `%${search}%` } },
            { numberOfPoints: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await Offers.findAll({
        where: condition, 
        order: [['brandName', 'ASC'], ['offerTitle', 'ASC'], ['numberOfPoints', 'ASC']]
    });
    res.json(list);
});


module.exports = router;
