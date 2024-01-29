const express = require("express");
const Service = require('../models/Service')
const router = express.Router({mergeParams: true});

router.get("/", async (req, res) => {
    try {
        const list = await Service.find()
        res.status(200).send(list)
    }catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибкаю Попробуйте позже.'
        })
    }
});

module.exports = router;
