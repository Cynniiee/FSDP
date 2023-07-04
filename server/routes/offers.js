// Reward Management - Offers (Cynthia)

const express = require('express');
const router = express.Router();
const yup = require("yup");

const { Offers, Sequelize } = require('../models');

// The post function is to add data into the list.
// Req = Request, Res = Response
router.post("/", async (req, res) => {
    let data = req.body;

    // Validate request body
    let validationSchema = yup.object({
        brandName: yup.string().trim().min(1).max(25).required(),
        offerTitle: yup.string().trim().min(5).max(25).required(),
        numberOfPoints: yup.number().min(0).max(1000000).required()
    });

    data.brandName = data.brandName.trim();
    data.offerTitle = data.offerTitle.trim();

    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({message: "Error Here"})
        return;
    }

    try {
        let result = await Offers.create(data)
        res.json(result)
    } catch (err) {
        console.error(err)
        res.json(err)
        throw err;
    }

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

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let offer = await Offers.findByPk(id);

    // Check id not found
    if (!offer) {
        res.sendStatus(404);
        return;
    }

    res.json(offer);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;

    // Check id not found
    let offer = await Offers.findByPk(id);
    if (!offer) {
        res.sendStatus(404);
        console.log("Unfound ID!")
        return;
    }

    let data = req.body;

    // Validate request body
    let validationSchema = yup.object({
        brandName: yup.string().trim().min(1).max(25).required(),
        offerTitle: yup.string().trim().min(5).max(25).required(),
        numberOfPoints: yup.number().min(0).max(1000000).required()
    });

    data.brandName = data.brandName.trim();
    data.offerTitle = data.offerTitle.trim();

    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }


    let num = await Offers.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Offer was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update offer with id ${id}.`
        });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Offers.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Offer was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete offer with id ${id}.`
        });
    }
});

module.exports = router;
