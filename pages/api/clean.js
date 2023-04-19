import { parse } from 'csv-parse';
import trim from "@/pages/api/trim";

function parseCSV(csvString) {
    return new Promise((resolve, reject) => {
        parse(csvString, (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function joinHeadersAndEntries(headers, entries, warnings) {
    return new Promise((resolve, reject) => {
        try {
            let content = headers.join(",") + "\n";
            for (let i = 0; i < entries.length; i++) {
                content += entries[i].join(",") + "\n";
            }
            resolve({content: content, warnings: warnings});
        } catch (err) {
            reject(err);
        }
    });
}

export default async function clean(content, template) {
    return new Promise((resolve, reject) => {
        // parse content
        parseCSV(content)
        // clean and modify content
            .then(data => {
                let [headers,...entries] = data;
                let warnings = [];
                return trim(headers, entries, warnings);
            })
        // reassemble content
            .then(data => {
                let [headers,...entries] = data.content;
                let warnings = data.warnings
                resolve(joinHeadersAndEntries(headers, entries[0], warnings));
            })
    });
}