const express = require("express");
const router = express.Router();
const main = require("../scrapeFuncion/scrape");

router.post("/indeed", async (req, res) => {
    try {
        const { skill } = req.body;
        let scrap = await main(skill);
        return res.status(200).json({
            status: "ok",
            list: scrap?.list || {}, // if scrap is null ... dont proceed to dot function
        });
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;
