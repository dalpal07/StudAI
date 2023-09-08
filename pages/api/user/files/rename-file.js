const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { id, oldFileName, newFileName } = req.body;
            const sourceBucket = process.env.AWS_BUCKET_NAME;
            const oldPath = id + '-data/' + oldFileName;
            const newPath = id + '-data/' + newFileName;
            const copyParams = {
                Bucket: sourceBucket,
                CopySource: `/${sourceBucket}/${oldPath}`,
                Key: newPath,
            };
            s3.copyObject(copyParams, (err, data) => {
                if (err) {
                    console.error('Error copying object:', err);
                } else {
                    console.log('Object copied successfully:', data);

                    // Now that the copy is successful, you can delete the original object
                    const deleteParams = {
                        Bucket: sourceBucket,
                        Key: oldPath,
                    };

                    s3.deleteObject(deleteParams, (deleteErr, deleteData) => {
                        if (deleteErr) {
                            console.error('Error deleting original object:', deleteErr);
                        } else {
                            console.log('Original object deleted successfully:', deleteData);
                        }
                    });
                }
            });
            res.status(200).json({message: 'success'});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: e.message});
        }
    }
}