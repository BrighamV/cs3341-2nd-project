const dotenv = require('dotenv');
const aws = require('aws-sdk');
require('util.promisify').shim();
const crypto = require('crypto');
// import crypto, { randomBytes } from 'crypto'
// import { promisify } from "util"
const randomBytes = (crypto.randomBytes)

dotenv.config();


const region = "us-west-1"
const bucketName = "my-pantry-image-upload"
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploaduRL
}

module.exports = { 
    generateUploadURL
  }