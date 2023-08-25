const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { id } = req.body;
            const prefix = id + '-data/';

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Prefix: prefix,
            };

            s3.listObjects(params, (err, data) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    const fileNames = data.Contents.map(item => item.Key.replace(prefix, ''));
                    res.status(200).json({ fileNames });
                }
            });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
