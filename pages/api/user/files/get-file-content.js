const AWS = require('aws-sdk');
const csv = require('csv-parser');
const Readable = require('stream').Readable;

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

class S3ReadableStream extends Readable {
    constructor(bucket, key) {
        super();
        this.bucket = bucket;
        this.key = key;
        this.objectStream = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();
    }

    _read(size) {
        this.objectStream.on('data', chunk => {
            this.push(chunk);
        });

        this.objectStream.on('end', () => {
            this.push(null);
        });
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            const { fileName } = req.query;
            const path = id + '-data/' + fileName;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: path,
            };

            const stream = new S3ReadableStream(params.Bucket, params.Key);

            let csvData = [];
            let isFirstRow = true;

            stream
                .pipe(csv({ raw: false }))
                .on('data', row => {
                    if (isFirstRow) {
                        csvData.push(Object.keys(row));
                        isFirstRow = false;
                    }
                    csvData.push(Object.values(row));
                })
                .on('end', () => {
                    const headers = csvData.shift();
                    res.status(200).json({ headers: headers, entries: csvData });
                });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
