
/* okay so sample data for students are gonna be formatted like this
 * name: string,
 * firstPref: string,
 * secondPref: string,
 * contactNo: string,
 * email: string,
 * school: string,]
 * committee: string,
 */

import XLSX from "xlsx";
import fs from "fs";
import { readCSV } from "./csv2json.js";

const main = async () => {
    await readCSV("input.csv")
    .then(allocateDelegates)
}

const allocateDelegates = () =>
{

    let noCom = [];
    let committees = JSON.parse(fs.readFileSync("committees.json", "utf-8"))
    let delegates = JSON.parse(fs.readFileSync("output.json", "utf-8"))

    for( let i = 0; i < delegates.length; i++) {
        let delegate = delegates[i];
        let pref1 = committees.find((committee) => committee.name === delegate.firstPref);
        let pref2 = committees.find((committee) => committee.name === delegate.secondPref);

        if ((pref1.current < pref1.max) && delegate.previousExperience >= pref1.level) {
            pref1.dels.push(delegate);
            pref1.current++;
            delegate.committee = pref1.name;
        } else if ((pref2.current < pref2.max) && delegate.previousExperience >= pref2.level){
            pref2.dels.push(delegate);
            pref2.current++;
            delegate.committee = pref2.name;
        } else {
            noCom.push(delegate);
        }

    }

    writeToXLSX("allocation.xlsx",committees, noCom);

}

const writeToXLSX = (outName, committees, noCom) => 
{
const wb = XLSX.utils.book_new();

for (const committee of committees) {
    const ws = XLSX.utils.json_to_sheet(committee.dels);
    XLSX.utils.book_append_sheet(wb, ws, committee.name);
}

if (noCom.length > 0) {
    const ws = XLSX.utils.json_to_sheet(noCom);
    XLSX.utils.book_append_sheet(wb, ws, "unassigned");
}

XLSX.writeFile(wb, outName);
console.log("Excel file created successfully!");
}

/* logging purposes, commented out until needed again
    const printDels = (committee) => {
        for ( let i = 0; i < committee.dels.length; i++) {
            console.log(`${i+1} name: ${committee.dels[i]} \n`);
        }

    }

    for (let i = 0; i < committees.length; i++) {
        console.log(`committee name: ${committees[i].name}`);
        console.log(`current number of delegates: ${committees[i].current} `);
        console.log(`max number of delegates: ${committees[i].max} \n`);
        console.log(printDels(committees[i]));
    }
*/

main();
