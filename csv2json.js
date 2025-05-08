import csv from 'csv-parser'
import fs from 'fs';

export const writeToJson = (outFile,results) => {
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log('Data written to file');
};

export const readCSV = (csvPath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    results.length = 0; 
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push({
        name: data['Enter your name:'],
        firstPref: data['What is your first preferred committee?'],
        secondPref: data['What is your second preferred committee? (cannot be identical to first preferred committee)'],
        contactNo: data['Personal contact number:'],
        email: data['Enter your email:'],
        school: data['Enter the name of your school:'],
        committee: "",
      }))
      .on('end', () => {
        writeToJson("output.json",results);
        resolve();
      })
      .on('error', (err) => reject(err));
  });
}

