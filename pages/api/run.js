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

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const body = JSON.parse(req.body);
            const generatedFunction = getCorrectFunctionString(body.generatedFunction);
            console.log(generatedFunction)
            const headers = body.headers;
            console.log(headers)
            const entries = body.entries;
            console.log(entries)
            console.log("Running script")
            const performRequest = await eval(`(${generatedFunction})`)
            console.log("Script evaluated")
            const response = await performRequest(headers, entries)
            console.log("Script run: " + response)
            const newHeaders = response.headers
            let newEntries = response.entries
            let tempEntries = []
            for (let i = 0; i < newEntries.length; i++) {
                if (newEntries[i].length === newHeaders.length) {
                    tempEntries.push(newEntries[i])
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