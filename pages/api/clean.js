import { parse } from 'csv-parse';

let headers
let entries

async function parseCSV(csvString) {
    parse(csvString, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            [headers, ...entries] = data;
            console.log('Headers:', headers);
            console.log('Entries:', entries);
        }
    });
}

export default async function clean(content) {
    await parseCSV(content);
    // clean and modify content
    return content;
}