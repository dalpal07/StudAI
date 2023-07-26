import { saveAs } from 'file-saver';

export function downloadFile(content, fileName) {
    // if fileName extension is not csv, change to csv
    if (fileName.split(".")[1] !== "csv") {
        fileName = fileName.split(".")[0] + ".csv"
    }
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
}