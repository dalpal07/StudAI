import {read, utils} from "xlsx";

function splitLine(row) {
    let entries = []
    let entry = ""
    let inQuotes = false
    for (let i = 0; i < row.length; i++) {
        if (row[i] === "\"") {
            inQuotes = !inQuotes
        }
        if (row[i] === "," && !inQuotes) {
            entries.push(entry)
            entry = ""
        } else {
            entry = entry + row[i]
        }
    }
    entries.push(entry)
    return entries
}
export function getFileHeaders(csvData) {
    let headers = []
    let lines = csvData.split("\n")
    if (lines.length > 0) {
        let headerLine = lines[0]
        headers = splitLine(headerLine)
        for (let i = 0; i < headers.length; i++) {
            headers[i] = headers[i].trim()
        }
    }
    return headers
}
export function getFileEntries(csvData) {
    let entries = []
    let lines = csvData.split("\n")
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i]
        let entry = splitLine(line)
        for (let j = 0; j < entry.length; j++) {
            entry[j] = entry[j].trim()
        }
        entries.push(entry)
    }
    return entries
}
export const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
};
export function readCsvFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result;
            resolve(content);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
export function readXlsxFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const csv = utils.sheet_to_csv(worksheet);
            resolve(csv);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}