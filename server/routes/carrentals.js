// Client Side - Car Rental - Product & order management (Jia yee)

const express = require('express');
const router = express.Router();
const { CarRental, Sequelize } = require('../models');
const yup = require("yup");


router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        carPlateNumber: yup.string().trim().min(3).max(100).required(),
        carLocation: yup.string().trim().min(3).max(500).required(),
        carBattery: yup.number().positive().min(0).max(100).required()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.carPlateNumber = data.carPlateNumber.trim();
    data.carLocation = data.carLocation.trim();
    data.carBattery = data.carBattery;

    let result = await CarRental.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { carPlateNumber: { [Sequelize.Op.like]: `%${search}%` } },
            { carLocation: { [Sequelize.Op.like]: `%${search}%` } },
            { carBattery: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await CarRental.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});


router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let carRental = await CarRental.findByPk(id);
    // Check id not found
    if (!carRental) {
        res.sendStatus(404);
        return;
    }
    res.json(carRental);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let carRental = await CarRental.findByPk(id);
    if (!carRental) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        carPlateNumber: yup.string().trim().min(3).max(100).required(),
        carLocation: yup.string().trim().min(3).max(500).required(),
        carBattery: yup.number().positive().min(0).max(100).required()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.carPlateNumber = data.carPlateNumber.trim();
    data.carLocation = data.carLocation.trim();
    data.carBattery = data.carBattery;

    let num = await CarRental.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Rental was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update rental with id ${id}.`
        });
    }

})

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await CarRental.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Rental was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete rental with id ${id}.`
        });
    }
});


module.exports = router;