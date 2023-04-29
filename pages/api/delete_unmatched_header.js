export default function delete_unmatched_header(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            if (template.length < headers.length) {
                for (let i = template.length; i < headers.length; ++i) {
                    warnings.push({msg: 'Original header: "' + headers[i] + '" removed because it was not found in template'})
                }
                headers = headers.splice(0, template.length)
                entries = entries.map(entry => entry.splice(0, template.length))
            }
            resolve({content: [headers, entries], warnings: warnings});
        } catch (error) {
            reject(error);
        }
    });
}