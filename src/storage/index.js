import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();


export const s3 = new S3Client({
    region: process.env.API_AWS_REGION,
    credentials: {
        accessKeyId: process.env.API_AWS_ACCESS_KEY,
        secretAccessKey: process.env.API_AWS_SECRET_ACCESS_KEY
    }
});


const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.API_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            cb(null, `products/${Date.now()}-${file.originalname}`);
        }
    })
});

export default upload;
