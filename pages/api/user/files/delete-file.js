const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
async function deleteFileFromS3(bucketName, fileName) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };

    try {
        await s3.deleteObject(params).promise();
        console.log(`File ${fileName} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting file ${fileName}: ${error}`);
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const bucketName = process.env.AWS_BUCKET_NAME;
            const { id, fileName } = req.body;
            const path = id + '-data/' + fileName;
            await deleteFileFromS3(bucketName, path);
            res.status(200).json({ message: 'File deleted successfully.' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Error deleting file.' });
        }
    }
}