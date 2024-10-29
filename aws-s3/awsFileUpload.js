import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { awsCrawlBucketName } from '../config/config.js';

// Create S3 service object
const s3Client = new S3Client({ apiVersion: "2012-10-17" });

export const uploadFileToS3 = async(folderName, fileName, fileContent) => {
  const region = await s3Client.config.region();
      // Put an object into an Amazon S3 bucket.
      await s3Client.send(
        new PutObjectCommand({
          Bucket: awsCrawlBucketName,
          Key: `${folderName}/${fileName}`,
          Body: fileContent,
        }),
      );
      return encodeURI(`https://${awsCrawlBucketName}.s3.${region}.amazonaws.com/${folderName}/${fileName}`);  
}