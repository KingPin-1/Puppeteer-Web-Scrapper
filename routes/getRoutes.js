const express = require("express");
const router = express.Router();
const main = require("../scrapeFunction/scrape");
const path = require("path");

router.post("/indeed", async (req, res) => {
    try {
        const { skill } = req.body;
        let scrap = await main(skill);
        return res.status(200).json({
            status: "ok",
            list: scrap?.list || {},
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
});

router.get("/getData", async (req, res) => {
    try {
        const jobs = path.join(__dirname, "..", "job.json");
        console.log(jobs);
        return res.status(200).sendFile(jobs);
    } catch (e) {
        return res.status(500).send(e);
    }
});

module.exports = router;
