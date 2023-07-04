const express = require('express');
const router = express.Router();
const {User, Card, Sequelize } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');


router.post("/", validateToken,  async (req, res) => {
    console.log("post");
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        cardname: yup.string().matches().min(3).max(50).required(),
        cardnumber: yup.string().matches().required(),
        CVV: yup.string().label().min(3).max(4).required()
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
    data.userId = req.user.id;
    let result = await Card.create(data);
    res.json(result);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let card = await Card.findByPk(id,{
        include: { model: User, as: "user", attributes: ['name'] }
    });
    // Check id not found
if (!card) {
    res.sendStatus(404);
    return;
    }
    res.json(card);
    });

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    console.log("get:", req);
    if (search) {
        condition[Sequelize.Op.or] = [
            { cardname: { [Sequelize.Op.like]: `%${search}%` } },
            { cardnumber: { [Sequelize.Op.like]: `%${search}%` } },
            { CVV: { [Sequelize.Op.like]: `%${search}%` } }
            //{ date: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }
    let list = await Card.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        include: { model: User, as: "user", attributes: ['name'] }
    });
    console.log("get res:", list);
    res.json(list);
});

router.put("/:id", validateToken,  async (req, res) => {
    let id = req.params.id;
    let card = await Card.findByPk(id);
if (!card) {
res.sendStatus(404);
return;
}
    let data = req.body;
        // Validate request body
        let validationSchema = yup.object().shape({
            cardname: yup.string().matches().min(3).max(50).required(),
            cardnumber: yup.string().matches().required(),
            CVV: yup.string().label().min(3).max(4).required()
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
    let num = await Card.update(data, {
    where: { id: id }
    });
    if (num == 1) {
    res.json({
    message: "Tutorial was updated successfully."
    });
    }
    else {
    res.status(400).json({
    message: `Cannot update tutorial with id ${id}.`
    });
    }
   });

   router.delete("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    let card = await Card.findByPk(id);
            // Check request user id
            let userId = req.user.id;
            if (card.userId != userId) {
            res.sendStatus(403);
            return;
            }
    let num = await Card.destroy({
        where: { id: id }
    })

    if (num == 1) {
        res.json({
            message: "Credit card details was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete Credit card with id ${id}.`
        });
    }
});

module.exports = router;
