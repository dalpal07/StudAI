import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";


if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

export const config = {
    runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {

    const { reqString } = (await req.json()) as {
        reqString?: string;
    };
    console.log("backend prompt: " + reqString);

    if (!reqString) {
        console.log("No prompt in the request")
        return new Response("No prompt in the request", { status: 400 });
    }

    console.log("Generating payload...")
    const payload: OpenAIStreamPayload = {
        model: "text-davinci-003",
        prompt: reqString,
        temperature: 1,
        max_tokens: 512,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
    };
    console.log("Getting stream...")
    const stream = await OpenAIStream(payload);
    console.log("returning from API...")
    return new Response(stream)
};

export default handler;