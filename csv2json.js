import csv from 'csv-parser'
import fs from 'fs';

export const writeToJson = (outFile,results) => {
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log('Data written to file');
};

export const readCSV = (csvPath) => {
  const results = [];
  let skipHeaderRow = true;

  const decideLevel = (exp) => {
    return exp>=7 ? 3 : exp>=4 ? 2 : 1;
  }
  return new Promise((resolve, reject) => {
    results.length = 0; 
    fs.createReadStream(csvPath)
      .pipe(csv({
        skipLines: 1,
        headers: ["Timestamp", "Name", "Email", "School", "ContactNo", "Experience", "FirstPref", "SecondPref"]
      }))      .on('data', (data) => {
        if (skipHeaderRow && data['Name'] === 'Enter your name:') {
          skipHeaderRow = false;
          return;
        }
        results.push({
          name: data['Name'],
          firstPref: data['FirstPref'],
          secondPref: data['SecondPref'],
          contactNo: data['ContactNo'],
          email: data['Email'],
          school: data['School'],
          previousExperience: decideLevel(data['Experience']),
          committee: "",
        });
      })
      .on('end', () => {
        writeToJson("output.json",results);
        resolve();
      })
      .on('error', (err) => reject(err));
  });
}

