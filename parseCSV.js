import csv from "csv-parser";
import fs from "fs";
import formatCSVRes from './formatRawData.js'
const results = [];



fs.createReadStream('../Not UberEats Calgary  - Submit a Restaurant (Responses) - Form responses 1.csv')
  .pipe(csv())
  // .on('data', (data) => results.push(data)) // need to create a helper fuction to parse each line of the csv and call it here
  .on('data', (data) => (formatCSVRes(data,'parseCSV')))
  .on('end', () => {
    console.log(results);
  
  });