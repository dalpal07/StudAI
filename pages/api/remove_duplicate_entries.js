export default function remove_duplicate_entries(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
       try {
           const uniqueLists = new Set(entries.map((entry) => JSON.stringify(entry)));
           entries = [];
           for (let uniqueList of uniqueLists) {
               entries.push(JSON.parse(uniqueList));
           }
           resolve({content: [headers, entries], warnings: warnings});
       } catch (error) {
           reject(error);
       }
    });
}