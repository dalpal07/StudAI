import hungarian from 'munkres-js';

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

function calculateDistances(list1, list2) {
    const distances = [];

    for (let i = 0; i < list1.length; i++) {
        distances.push([]);
        for (let j = 0; j < list2.length; j++) {
            distances[i][j] = levenshteinDistance(list1[i], list2[j]);
        }
    }

    return distances;
}


export default function match_header_value(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            const templateHeaders = template.map((item) => item.header);
            const distances = calculateDistances(headers, templateHeaders);
            const result = hungarian(distances);
            for (let i = 0; i < result.length; i++) {
                let header = headers[result[i][0]];
                let templateHeader = template[result[i][1]].header;
                if (header !== templateHeader) {
                    warnings.push(`Header "${header}" changed to template header "${templateHeader}".`);
                    headers[result[i][0]] = templateHeader;
                }
            }
            resolve({content: [headers, entries], warnings: warnings});
        } catch (error) {
            reject(error);
        }
    });
}