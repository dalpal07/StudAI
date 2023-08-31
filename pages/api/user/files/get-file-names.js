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
                    const latestModifications = data.Contents.map(item => item.LastModified);
                    const daysAgo = latestModifications.map(item => {
                        const diff = Math.abs(new Date() - item);
                        return Math.floor(diff / (1000 * 60 * 60 * 24));
                    });
                    res.status(200).json({ fileNames: fileNames, daysAgo: daysAgo });
                }
            });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
