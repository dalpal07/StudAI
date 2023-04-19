function swapColumns(col1, col2, headers, entries) {
    [headers[col1], headers[col2]] = [headers[col2], headers[col1]]
    entries.forEach(row => {
        [row[col1], row[col2]] = [row[col2], row[col1]];
    })
    return [headers, entries]
}

export default function match_header_order(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            if (headers.length === template.length) {
                for (let i = 0; i < template.length; ++i) {
                    if (template[i].header !== headers[i]) {
                        for (let j = 0; j < headers.length; ++j) {
                            if (template[i].header === headers[j]) {
                                [headers, entries] = swapColumns(i, j, headers, entries)
                            }
                        }
                    }
                }
            } else {
                warnings.push({msg: "Template size (" + template.length + ") and Headers size (" + headers.length + ") are incongruent"})
            }
            resolve({content: [headers, entries], warnings: warnings});
        } catch (error) {
            reject(error);
        }
    });
}
