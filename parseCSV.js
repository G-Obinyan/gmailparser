import csv from "csv-parser";
import fs from "fs";
const results = [];



fs.createReadStream('../Not UberEats Calgary  - Submit a Restaurant (Responses) - Form responses 1.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data)) //this weh 
  .on('end', () => {
    console.log(results);
  
  });