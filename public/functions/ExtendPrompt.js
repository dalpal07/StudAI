export default async function ExtendPrompt({prompt, isScript, dataHistory, dataIndex, conversation, conversationIndex}) {
    prompt = prompt + "\n\nInformation about the data:\n\nHeaders: "
    for (let i = 0; i < dataHistory[dataIndex].headers.length; i++) {
        if (i === dataHistory[dataIndex].headers.length - 1) {
            prompt = prompt + dataHistory[dataIndex].headers[i]
            break
        }
        prompt = prompt + dataHistory[dataIndex].headers[i] + ", "
    }
    if (dataHistory[dataIndex].entries.length > 0) {
        prompt = prompt + "\nSample entries for reference (these entries should only be used for understanding what format the data generally follows):\n"
        if (dataHistory[dataIndex].entries.length > 5) {
            const randomIndices = []
            while (randomIndices.length < 5) {
                const randomIndex = Math.floor(Math.random() * dataHistory[dataIndex].entries.length)
                if (!randomIndices.includes(randomIndex)) {
                    randomIndices.push(randomIndex)
                }
            }
            for (let i = 0; i < randomIndices.length; i++) {
                for (let j = 0; j < dataHistory[dataIndex].entries[randomIndices[i]].length; j++) {
                    if (j === dataHistory[dataIndex].entries[randomIndices[i]].length - 1) {
                        prompt = prompt + dataHistory[dataIndex].entries[randomIndices[i]][j]
                        break
                    }
                    prompt = prompt + dataHistory[dataIndex].entries[randomIndices[i]][j] + ", "
                }
                prompt = prompt + "\n"
            }
            prompt = prompt + "\n"
        }
        else {
            for (let i = 0; i < dataHistory[dataIndex].entries.length; i++) {
                for (let j = 0; j < dataHistory[dataIndex].entries[i].length; j++) {
                    if (j === dataHistory[dataIndex].entries[i].length - 1) {
                        prompt = prompt + dataHistory[dataIndex].entries[i][j]
                        break
                    }
                    prompt = prompt + dataHistory[dataIndex].entries[i][j] + ", "
                }
                prompt = prompt + "\n"
            }
        }
    }
    if (!isScript) {
        if (conversationIndex > 0) {
            prompt = prompt + "\nPrevious conversation for reference (this information should not be used unless the user specifically refers to it in the current conversation):\n" + conversation.slice(0, conversationIndex).map((line) => {
                if (line.type === "user") {
                    return "\nUser: " + line.message
                } else {
                    return "\nStud: " + line.message
                }
            })
            prompt = prompt + "\n\n"
        }
        prompt = prompt + "\nRespond to the current conversation:\n" + conversation.slice(conversationIndex).map((line) => {
            if (line.type === "user") {
                return "\nUser: " + line.message
            } else {
                return "\nStud: " + line.message
            }
        }) + "\nStud: [insert]"
    }
    else {
        prompt = prompt + "\nConversation:\n" + conversation.slice(conversationIndex).map((line) => {
            if (line.type === "user") {
                return "\nUser: " + line.message
            } else {
                return "\nStud: " + line.message
            }
        })
    }
    return prompt
}