export default async function ExtendPrompt({prompt, isScript, dataHistory, dataIndex, conversation, conversationIndex}) {
    prompt = prompt + "\n\nData headers: "
    for (let i = 0; i < dataHistory[dataIndex].headers.length; i++) {
        if (i === dataHistory[dataIndex].headers.length - 1) {
            prompt = prompt + dataHistory[dataIndex].headers[i]
            break
        }
        prompt = prompt + dataHistory[dataIndex].headers[i] + ", "
    }
    if (isScript) {
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