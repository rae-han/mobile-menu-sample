const express = require('express');
const fs = require('fs');
const { Readable } = require('stream');
const AWS = require('aws-sdk')
const multer = require('multer');
const sharp = require('sharp');

const router = express.Router();
const upload = multer()

AWS.config.update({ region: 'ap-northeast-2' });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

router.post('/upload', upload.single('file'), async (req, res, next) => {
  console.log('######## ######## file upload server ######## ########')
  // ## req.file
  console.log(req.file)
  console.log(req.file.originalname.toString())
  // ## req.body
  // console.log(req.body)
  const fileBuffer = req.file.buffer;
  console.log(fileBuffer);

  const resizeFileBuffer = await sharp(fileBuffer)
    .resize({
      fit: sharp.fit.contain,
      width: 20,
    }).toBuffer();

  console.log('resize')
  console.log(resizeFileBuffer)

  const fileStream = Readable.from(fileBuffer);
  console.log(fileStream)

  fileStream.on('data', (chuck) => {

  })

  fileStream.on('error', (error) => {
    console.log('File error')
    console.error(error)
  })

  // TODO: 압축

  const uploadParams = {
    Bucket: 'raehan-test',
    Key: `${Date.now().toString()}.png`, // TODO: 올라갈 파일 명
    Body: fileStream,
  };

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.error("Error", err)
    }

    if (data) {
      console.log('Upload Success', data.Location)
    }
  })
});

module.exports = router;