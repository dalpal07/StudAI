import fs from "fs";
import clean from "@/pages/api/clean";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);
        const fileContent = body.content;
        const fileName = body.name
        const fileExt = body.ext;
        const newFileName = `${fileName}_${Date.now()}.${fileExt}`;
        const cleanContent = await clean(fileContent);
        await fs.promises.writeFile(`./public/uploads/${newFileName}`, cleanContent);
        res.status(200).json({fileName: newFileName});
    } else {
        res.status(405).send('Method Not Allowed');
    }
};