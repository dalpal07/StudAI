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
            const entries = body.entries;
            const performRequest = await eval(`(${generatedFunction})`)
            const response = await performRequest(headers, entries)
            res.status(200).json({ headers: response.headers, entries: response.entries });
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ error: err.message });
        }
    }
}