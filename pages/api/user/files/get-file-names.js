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
                    const fileData = data.Contents.map(item => ({
                        fileName: item.Key.replace(prefix, ''),
                        lastModified: item.LastModified,
                    }));

                    // Sort the file data by the most recent lastModified date
                    fileData.sort((a, b) => b.lastModified - a.lastModified);

                    const daysAgo = fileData.map(item => {
                        const now = new Date();
                        const modifiedDate = new Date(item.lastModified);

                        // Set both dates to the same time (midnight)
                        now.setHours(0, 0, 0, 0);
                        modifiedDate.setHours(0, 0, 0, 0);

                        // Calculate the time difference in milliseconds
                        const timeDiff = now - modifiedDate;

                        // Convert milliseconds to days
                        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    });

                    const fileNames = fileData.map(item => item.fileName);

                    res.status(200).json({ fileNames: fileNames, daysAgo: daysAgo });
                }
            });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
