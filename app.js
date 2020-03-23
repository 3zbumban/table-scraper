const fs = require("fs");
const {join} = require('path');
const cheerio = require('cheerio');

const file = join(__dirname, "origin.html");
const filer = fs.readFileSync(file, "UTF-8");
const $ = cheerio.load(filer)
const th = $("thead tr th").toArray();
const tb = $("tbody tr").toArray();

const result = [];

tb.forEach((el) => {
    const currentRow = cheerio("td", cheerio.html(el)).toArray();
    let temp = {};
    currentRow.forEach((el, i) => {
        const head = cheerio(cheerio.html(th[i])).text();
        const cell = cheerio(cheerio.html(el)).text();
        temp[head] = cell;
    });
    result.push(temp);
});

fs.writeFileSync("object.json", JSON.stringify(result))