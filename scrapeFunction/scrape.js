const puppeteer = require("puppeteer");
const fs = require("fs");
const data = {
    list: [],
};

async function main(details) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const { skill, location } = details;
    await page.goto(`https://in.indeed.com/jobs?q=${skill}&l=${location}`, {
        timeout: 0,
        waitUntil: "networkidle0",
    });

    // const screenshot = await page.screenshot({ fullPage: true });
    // fs.writeFile("screenshot.png", screenshot, "base64", () => {
    //     console.log("Screenshot taken");
    // });

    const jobData = await page.evaluate(async (data) => {
        const items = document.querySelectorAll("td.resultContent");
        items.forEach((item) => {
            const title = item.querySelector("h2.jobTitle>a")?.innerText;
            const link = item.querySelector("h2.jobTitle>a")?.href;
            let salary =
                item.querySelector(
                    "div.metadata.salary-snippet-container > div"
                )?.innerText || "Not mentioned";
            const companyName =
                item.querySelector("span.companyName")?.innerText;

            data.list.push({ title, salary, companyName, link });
            console.log("data :>> ", data);
        });
        return data;
    }, data);

    let response = await jobData;
    let json = JSON.stringify(await jobData, null, 2) || " ";
    fs.writeFile("job.json", json, "utf-8", () => {
        console.log("Written in job.json");
    });
    browser.close();
    return response;
}

module.exports = main;
