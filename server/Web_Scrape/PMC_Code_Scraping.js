// using puppeteer

// id's: to check
// 101211-P
// 101959-P
// 104744-P
// 14358-D

const puppeteer = require('puppeteer');

global.doc_id = '101959-P';

(async () => {
    // doc_id = '104744-P';
    let doc_reg_No = 'https://www.pmc.gov.pk/Doctors/Details?regNo='+doc_id;

    let browser = await puppeteer.launch();
    let  page = await browser.newPage();

    await page.goto(doc_reg_No, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {
        let reg_No = document.querySelector('div[class="fontLight"] > #reg_no').innerText;
        let full_name = document.querySelector('div[class="fontLight"] > #full_name').innerText;
        let father_name = document.querySelector('div[class="fontLight"] > #father_name').innerText;
        let license_valid = document.querySelector('div[class="fontLight"] > #license_valid').innerText;

        return {
            reg_No,
            full_name,
            father_name,
            license_valid
        }
    });
    console.log(data);

    await browser.close();
})();