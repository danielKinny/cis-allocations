import csv from 'csv-parser'
import fs from 'fs';

export const writeToJson = (outFile,results) => {
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log('Data written to file');
};

export const readCSV = (csvPath) => {
  const results = [];

  const decideLevel = (exp) => {
    return exp>=7 ? 3 : exp>=4 ? 2 : 1;
  }
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
        previousExperience: decideLevel(data['How many MUNs have you been to?']),
        committee: "",
      }))
      .on('end', () => {
        console.log( typeof results[0].previousExperience)
        writeToJson("output.json",results);
        resolve();
      })
      .on('error', (err) => reject(err));
  });
}

