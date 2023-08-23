import {createParser, ParsedEvent, ReconnectInterval} from "eventsource-parser";

export interface OpenAIScriptStreamPayload {
    model: string;
    messages: Array<{ role: string; content: string }>;
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    stop: string;
    stream: boolean;
}

export async function OpenAIScriptStream(payload: OpenAIScriptStreamPayload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let counter = 0;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });
    return new ReadableStream({
        async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === "event") {
                    const data = event.data;
                    if (data === "[DONE]") {
                        controller.close();
                        return;
                    }
                    try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].delta.content;
                        if (counter < 2 && (text.match(/\n/) || []).length) {
                            return;
                        }
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                        counter++;
                    } catch (e) {
                        controller.error(e);
                    }
                }
            }

            const parser = createParser(onParse);

            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });
}
