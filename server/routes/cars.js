// Admin Side - Car management - Product & order management (Jia yee)

const express = require('express');
const router = express.Router();
const { Car, Sequelize } = require('../models');
const yup = require("yup");


router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        carPlateNumber: yup.string().trim().min(8).max(10).required(),
        carMakeModel: yup.string().trim().min(10).max(100).required(),
        carLastMaintained: yup.string().trim().min(10).max(100).required(),
        carLocation: yup.string().trim().min(10).max(100).required(),
        carBattery: yup.number().min(0).max(100).required(),
        carRates: yup.number().min(0).max(100).required(),
        carLease: yup.string().trim().min(8).max(10).required()
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
    data.carMakeModel = data.carMakeModel.trim();
    data.carLastMaintained = data.carLastMaintained.trim();
    data.carLocation = data.carLocation.trim();
    data.carBattery = data.carBattery;
    data.carRates = data.carRates;
    data.carLease = data.carLease.trim();

    let result = await Car.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { carPlateNumber: { [Sequelize.Op.like]: `%${search}%` } },
            { carMakeModel: { [Sequelize.Op.like]: `%${search}%` } },
            { carLocation: { [Sequelize.Op.like]: `%${search}%` } },
            { carBattery: { [Sequelize.Op.like]: `%${search}%` } },
            { carLastMaintained: { [Sequelize.Op.like]: `%${search}%` } },
            { carLease: { [Sequelize.Op.like]: `%${search}%` } }
        ];

    }

    let list = await Car.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);

    
});


router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let car = await Car.findByPk(id);
    // Check id not found
    if (!car) {
        res.sendStatus(404);
        return;
    }
    res.json(car);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let car = await Car.findByPk(id);
    if (!car) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        carPlateNumber: yup.string().trim().min(8).max(10).required(),
        carMakeModel: yup.string().trim().min(10).max(100).required(),
        carLastMaintained: yup.string().trim().min(10).max(100).required(),
        carLocation: yup.string().trim().min(10).max(100).required(),
        carBattery: yup.number().positive().min(0).max(100).required(),
        carRates: yup.number().min(0).max(100).required(),
        carLease: yup.string().trim().min(8).max(10).required()
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
    data.carMakeModel = data.carMakeModel.trim();
    data.carLastMaintained = data.carLastMaintained.trim();
    data.carLocation = data.carLastMaintained.trim();
    data.carBattery = data.carBattery;
    data.carRates = data.carRates;
    data.carLease = data.carLease.trim();

    let num = await Car.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Car was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update car with id ${id}.`
        });
    }

})

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Car.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Car was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete car with id ${id}.`
        });
    }
});


module.exports = router;