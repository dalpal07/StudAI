import fs from "fs";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);
        const fileContent = body.content;
        const fileName = body.name
        const fileExt = body.ext;
        const newFileName = `${fileName}_${Date.now()}.${fileExt}`;
        await fs.promises.writeFile(`./public/uploads/${newFileName}`, fileContent);
        res.status(200).json({fileName: newFileName});
    } else {
        res.status(405).send('Method Not Allowed');
    }
};