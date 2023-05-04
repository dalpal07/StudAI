function levenshteinDistance(s, t) {
    const m = s.length;
    const n = t.length;
    const d = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));

    for (let i = 0; i <= m; i++) {
        d[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        d[0][j] = j;
    }

    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (s[i - 1] === t[j - 1]) {
                d[i][j] = d[i - 1][j - 1];
            } else {
                d[i][j] = Math.min(
                    d[i - 1][j] + 1, // deletion
                    d[i][j - 1] + 1, // insertion
                    d[i - 1][j - 1] + 1 // substitution
                );
            }
        }
    }

    return d[m][n];
}

function calculateMinimumDistance(word, list) {
    let bestMatch = [undefined, undefined];

    for (let i = 0; i < list.length; i++) {
        let dist = levenshteinDistance(word.toUpperCase(), list[i].toUpperCase());
        if (bestMatch[1] === undefined || dist < bestMatch[1]) {
            bestMatch = [list[i], dist]
        }
    }

    return bestMatch[0];
}

function parseInputs(inputs) {
    let parsedInputs = [];
    while (inputs.length > 0) {
        inputs = inputs.trim();
        if (inputs.length === 0) {
            break;
        }
        if (inputs[0] === ',') {
            inputs = inputs.substring(1);
        } else if (inputs[0] === '"') {
            inputs = inputs.substring(1);
            const position = inputs.indexOf('"');
            if (position < 0) {
                // error parsing
                return [];
            }
            const value = inputs.substring(0, position);
            parsedInputs.push(value);
            inputs = inputs.substring(position+1);
        } else {
            const position = inputs.indexOf(',');
            if (position < 0) {
                parsedInputs.push(inputs);
                inputs = ''
            }
            else {
                const value = inputs.substring(0, position);
                parsedInputs.push(value);
                inputs = inputs.substring(position);
            }
        }
    }
    parsedInputs.forEach((str, index) => {
        parsedInputs[index] = str.trim();
    });
    return parsedInputs;
}

export default function match_acceptable_inputs(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < template.length; ++i) {
                if (template[i].specifyInput) {
                    let inputs = parseInputs(template[i].acceptableInput);
                    entries.forEach((str, index) => {
                        if (!inputs.includes(entries[index][i])) {
                            let closest = calculateMinimumDistance(entries[index][i], inputs);
                            warnings.push({msg: 'Value "' + entries[index][i] + '" changed to "' + closest + '"'});
                            entries[index][i] = closest;
                        }
                    })
                }
            }
            resolve({content: [headers, entries], warnings: warnings});
        } catch (error) {
            reject(error);
        }
    })
}