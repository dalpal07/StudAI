import { parse } from 'csv-parse';
import trim from "@/pages/api/trim";
import required from "@/pages/api/required";
import match_header from "@/pages/api/match_header";
import type_conversion from "@/pages/api/type_conversion";
import match_acceptable_inputs from "@/pages/api/match_acceptable_inputs";
import remove_duplicate_entries from "@/pages/api/remove_duplicate_entries";

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
            .then(data => {
                let [headers,entries] = data.content;
                let warnings = data.warnings;
                if (template.length > 0) {
                    return match_header(headers, entries, template, warnings);
                } else {
                    return {content: [headers,entries], warnings: warnings};
                }
            })
            .then(data => {
                let [headers,entries] = data.content;
                let warnings = data.warnings;
                return type_conversion(headers, entries, template, warnings);
            })
            .then(data => {
                let [headers,entries] = data.content;
                let warnings = data.warnings;
                if (template.length > 0) {
                    return required(headers, entries, template, warnings);
                } else {
                    return {content: [headers,entries], warnings: warnings};
                }
            })
            .then(data => {
                let [headers,entries] = data.content;
                let warnings = data.warnings;
                return match_acceptable_inputs(headers, entries, template, warnings);
            })
            .then(data => {
                let [headers,entries] = data.content;
                let warnings = data.warnings;
                return remove_duplicate_entries(headers, entries, template, warnings);
            })
        // reassemble content
            .then(data => {
                let [headers,entries] = data.content;
                let warnings = data.warnings;
                resolve(joinHeadersAndEntries(headers, entries, warnings));
            })
    });
}