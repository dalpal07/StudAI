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
            const { id, headers, entries, fileName } = req.body;

            // Create CSV content from headers and entries
            const csvContent = [headers.join(','), ...entries.map(row => row.join(','))].join('\n');

            const path = id + "-data/" + fileName;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: path,
                Body: csvContent,
                ContentType: 'text/csv', // Set content type appropriately
            };

            s3.putObject(params, (err, data) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json({ message: 'File saved successfully' });
                }
            });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
