function findClosestMatch(searchString, list) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let closestMatch = "";
    for (let i = 0; i < list.length; i++) {
        let distance = levenshteinDistance(searchString.toUpperCase(), list[i].toUpperCase());
        if (distance < minDistance) {
            minDistance = distance;
            closestMatch = list[i];
        }
    }
    return closestMatch;
}

function levenshteinDistance(s, t) {
    let d = [];
    let n = s.length;
    let m = t.length;
    if (n === 0) return m;
    if (m === 0) return n;
    for (let i = n; i >= 0; i--) d[i] = [];
    for (let i = n; i >= 0; i--) d[i][0] = i;
    for (let j = m; j >= 0; j--) d[0][j] = j;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            let cost = s.charAt(i - 1) === t.charAt(j - 1) ? 0 : 1;
            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        }
    }
    return d[n][m];
}

export default function match_header_value(headers, entries, template, warnings) {
    return new Promise((resolve, reject) => {
        try {
            let headersToMatch = headers.slice();
            for (let i = 0; i < template.length; ++i) {
                if (i >= headers.length) {
                    warnings.push({msg: "Extra header provided in template was ignored: '" + template[i].header + "'"});
                    continue;
                }
                let closestMatch = findClosestMatch(template[i].header, headersToMatch);
                headersToMatch.splice(headersToMatch.indexOf(closestMatch), 1);
                if (closestMatch !== template[i].header) {
                    warnings.push({msg: "Header '" + closestMatch + "' was changed to '" + template[i].header + "'"});
                    headers[headers.indexOf(closestMatch)] = template[i].header;
                }
            }
            resolve({content: [headers, entries], warnings: warnings});
        } catch (error) {
            reject(error);
        }
    });
}