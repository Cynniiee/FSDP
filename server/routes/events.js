// Events & Vouchers - Events (Zen)

const express = require('express');
const router = express.Router();
const yup = require("yup");

const { Event, Sequelize } = require('../models');

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required(),
        constraints: yup.string().trim().min(20).max(500).required(),
        status: yup.bool().required(),
        evdate: yup.date().required()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.title = data.title.trim();
    data.description = data.description.trim();
    data.constraints = data.constraints.trim()
    let result = await Event.create(data);
    res.json(result);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let event = await Event.findByPk(id);
    // Check id not found
    if (!event) {
        res.sendStatus(404);
        return;
    }
    res.json(event);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { title: { [Sequelize.Op.like]: `%${search}%` } },
            { description: { [Sequelize.Op.like]: `%${search}%` } },
            { constraints: { [Sequelize.Op.like]: `%${search}%` } },
            { status: { [Sequelize.Op.like]: `%${search}%` } },
            { evdate: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }
    let list = await Event.findAll({
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});
router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let event = await Event.findByPk(id);
    if (!event) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(100).required(),
        description: yup.string().trim().min(3).max(500).required(),
        constraints: yup.string().trim().min(20).max(500).required(),
        status: yup.bool().required(),
        evdate: yup.date().required()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.title = data.title.trim();
    data.description = data.description.trim();
    data.constraints = data.constraints.trim()
    let num = await Event.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Event was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update event with id ${id}.`
        });
    }
});
router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Event.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Event was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete event with id ${id}.`
        });
    }
});

module.exports = router;