export default function trim(headers, entries, warnings) {
    return new Promise((resolve, reject) => {
        // trim and modify content
        try {
            let newHeaders = [];
            let newEntries = [];
            for (let i = 0; i < headers.length; i++) {
                newHeaders.push(headers[i].trim());
            }
            for (let i = 0; i < entries.length; i++) {
                let newEntry = [];
                for (let j = 0; j < entries[i].length; j++) {
                    newEntry.push(entries[i][j].trim());
                }
                newEntries.push(newEntry);
            }
            resolve({content: [newHeaders, newEntries], warnings: warnings});
        } catch (error) {
            reject(error);
        }
    });
}
