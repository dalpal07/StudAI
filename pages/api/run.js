function getCorrectFunctionString(functionString) {
    // Remove the semicolon at the end if it exists
    functionString = functionString.trim().replace(/;$/, '');
    // Make sure start of functionString is "function"
    while (true) {
        if (functionString.length === 0) {
            throw new Error("Wrong format for functionString");
        }
        if (functionString.startsWith("function")) {
            return functionString;
        }
        else {
            functionString = functionString.slice(1);
        }
    }
}

function addQuotes(row) {
    for (let i = 0; i < row.length; i++) {
        if (row[i].length > 0 && row[i][0] !== "\"" && row[i].includes(",")) {
            row[i] = "\"" + row[i] + "\"";
        }
    }
    return row;
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const body = JSON.parse(req.body);
            const generatedFunction = getCorrectFunctionString(body.generatedFunction);
            console.log(generatedFunction)
            const headers = body.headers;
            const entries = body.entries;
            const performRequest = await eval(`(${generatedFunction})`)
            const response = await performRequest(headers, entries)
            const newHeaders = addQuotes(response.headers)
            let newEntries = response.entries
            let tempEntries = []
            for (let i = 0; i < newEntries.length; i++) {
                if (newEntries[i].length === newHeaders.length) {
                    tempEntries.push(addQuotes(newEntries[i]))
                }
            }
            newEntries = tempEntries
            const newContent = newHeaders.join(",") + "\n" + newEntries.map(entry => entry.join(",")).join("\n")
            res.status(200).json({ content: newContent });
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ error: err.message });
        }
    }
}