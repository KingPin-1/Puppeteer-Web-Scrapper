const puppeteer = require("puppeteer");
const fs = require("fs");
const data = {
    list: [],
};

export async function main(skill) {
    const browser = await puppeteer.launch({ headless: false }); // headless false means we get to see browser
    const page = await browser.newPage();
    await page.goto(`https://in.indeed.com/jobs?q=${skill}&l=Delhi%2C+Delhi`, {
        timeout: 0,
        waitUntil: "networkidle0",
    });

    const jobData = await page.evaluate(async (data) => {
        const items = document.querySelectorAll("td.resultContent");
        items.forEach((item, index) => {
            const title = item.querySelector("h2.jobTitle>a")?.innerText;
            const link = item.querySelector("h2.jobTitle>a")?.href;
            const salary = item.querySelectorAll(
                "div.metadata.salary-snippet-container > div"
            )?.innerText;
            const companyName = item.querySelectorAll("span.companyName")?.innerText;

            if (salary === null) {
                salary = "not defined";
            }

            data.list.push(title, salary, companyName, link);
        });
    },data);

    let response = await jobData;
    let json = JSOn.stringify(jobData,null,2);
    fs.writeFile('job.json',json,'utf-8',() => {
        console.log("Written in job.json");
    });
    browser.close();
    return response;
}
