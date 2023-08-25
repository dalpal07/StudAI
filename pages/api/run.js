const maxFileSizeBytes = 250 * 1024 * 1.25;

function getStringSimilarityScore(str1, str2) {
    const findBestMatch = require('string-similarity').findBestMatch;
    const strings = [String(str1)];
    const { bestMatch } = findBestMatch(String(str2), strings);
    return bestMatch.rating;
}
function refineFunctionString(functionString) {
    while (true) {
        if (functionString.length === 0) {
            throw new Error("Wrong format for functionString");
        }
        if (functionString.toLowerCase().startsWith("function performrequest")) {
            // make the first letter lowercase
            const firstLetter = functionString[0].toLowerCase();
            functionString = firstLetter + functionString.slice(1);
            break;
        }
        else {
            functionString = functionString.slice(1);
        }
    }
    let refinedFunctionString = ""
    let bracketCount = 0;
    for (let i = 0; i < functionString.length; i++) {
        refinedFunctionString += functionString[i];
        if (functionString[i] === "{") {
            bracketCount++;
        }
        else if (functionString[i] === "}") {
            bracketCount--;
            if (bracketCount === 0) {
                break;
            }
        }
    }
    return refinedFunctionString;
}

function verifyReturnHeadersIsArray(object) {
    if (!Array.isArray(object)) {
        throw new Error("Headers returned are not an array.");
    }
}

function verifyReturnEntriesIsDoubleArray(object) {
    if (!Array.isArray(object)) {
        throw new Error("Entries returned are not a double array.");
    }
    for (let i = 0; i < object.length; i++) {
        if (!Array.isArray(object[i])) {
            throw new Error("Entries returned are not a double array.");
        }
    }
}

function verifyNotExceedingMaxFileSize(object) {
    // console.log("Content length: " + (JSON.stringify(object).length / 1024 / 1.25) + "KB")
    if (JSON.stringify(object).length > maxFileSizeBytes) {
        throw new Error("File size exceeds maximum file size of " + maxFileSizeBytes / 1024 / 1.25 + "KB.")
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const body = JSON.parse(req.body);
            const generatedFunction = refineFunctionString(body.generatedFunction);
            console.log("Script:\n" + generatedFunction)
            const headers = body.headers;
            const entries = body.entries;
            const performRequest = await eval(`(${generatedFunction})`)
            const response = await performRequest(headers, entries)
            verifyReturnHeadersIsArray(response.headers)
            verifyReturnEntriesIsDoubleArray(response.entries)
            verifyNotExceedingMaxFileSize(response)
            console.log("Returning from run.js")
            res.status(200).json({ headers: response.headers, entries: response.entries });
        }
        catch (err) {
            console.log(err.toString())
            res.status(500).json({ error: err.toString(), stack: err.stack});
        }
    }
}