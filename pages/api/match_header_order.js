function moveColumn(newIndex, oldIndex, headers, entries) {
    let header = headers[oldIndex];
    headers.splice(oldIndex, 1);
    headers.splice(newIndex, 0, header);
    entries.forEach(row => {
        let entry = row[oldIndex];
        row.splice(oldIndex, 1);
        row.splice(newIndex, 0, entry);
    })
    return [headers, entries]
}

export default function match_header_order(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < template.length; ++i) {
                for (let j = i+1; j < headers.length; ++j) {
                    if (template[i].header === headers[j]) {
                        [headers, entries] = moveColumn(i, j, headers, entries)}
                }
            }
            resolve({content: [headers, entries], warnings: warnings});
        } catch (error) {
            reject(error);
        }
    });
}
