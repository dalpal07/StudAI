export default function required(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < template.length; ++i) {
                if (template[i].required) {
                    for (let j = 0; j < entries.length; ++j) {
                        if (entries[j][i].length === 0) {
                            warnings.push({
                                msg: template[i].header + ' is required, but row ' + (j+1) + ' contains an empty value'
                            })
                        }
                    }
                }
            }
            resolve({content: [headers, entries], warnings: warnings});
        } catch (error) {
            reject(error);
        }
    });
}
