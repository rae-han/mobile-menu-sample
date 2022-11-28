const { Readable } = require('stream');
const sharp = require('sharp');
const AWS = require('aws-sdk');
const parser = require('lambda-multipart-parser');

AWS.config.update({ region: 'ap-northeast-2' });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const webp = ['jpeg', 'png', 'gif'];

function CreateUploadParams ({ bucket, image, key }) {
  this.bucket = bucket;
  this.key = key;

  const mimetype = image.contentType;
  const today = new Date();

  this.do = async ({ option, resizeConfig } = {}) => {
    let fileBuffer = image.content;

    if (option === 'resize' || option === 'loading') {
      fileBuffer = await sharp(fileBuffer)
        .resize(resizeConfig)
        .toBuffer()
    }

    if (option === 'grey') {
      fileBuffer = await sharp(fileBuffer)
        .greyscale()
    }

    if (option === 'webp') {
      fileBuffer = await sharp(fileBuffer)
        .webp()
    }

    const fileStream = Readable.from(fileBuffer);
    const directory = `images/${today.getUTCFullYear()}/${today.getUTCMonth()+1}/${option}`;
    const utcTime = `${today.getTime()}`;
    const ext = option === 'webp' ? 'webp' : mimetype.split('/')[1];

    const Key = `${directory}/img_${utcTime}.${ext}`;

    const params = {
      Bucket: this.bucket,
      Key,
      Body: fileStream,
      ACL: 'public-read',
      ContentType: `${mimetype}`,
    }

    const result = await s3.upload(params).promise();
    return result.Location;
  }
}

exports.handler = async (event, context, callback) => {
  const result = await parser.parse(event);
  const files = result.files;

  if (files.length !== 1) {
    console.log('이미지는 한장만 보내야한다는 에러');
  }

  const image = files[0];

  // console.log('result', result);
  // console.log('files', files);
  // console.log('image', image);

  const { bucketName, options: optionsString, resizeConfig: resizeConfigString } = result;
  let options = {}, resizeConfig = {};

  if (typeof optionsString === 'string') {
    options = JSON.parse(optionsString);
    // console.log('options', options)
  }

  if (typeof resizeConfigString === 'string') {
    resizeConfig = JSON.parse(resizeConfigString)
    // console.log('resizeConfig', resizeConfig)
  }

  const upload = new CreateUploadParams({ bucket: bucketName, image, key: 'test' })

  const metadata = await sharp(image.content).metadata();
  const { format, size, width, height } = metadata;
  console.log(format, size, width, height)

  result.origin = await upload.do({ option: 'original' });
  result.loading = await upload.do({ option: 'loading', resizeConfig: {
      width: width/4 > 160 ? Math.ceil(width/4) : 160
    }})

  if (webp.includes(format)) {
    result.webp = await upload.do({ option: 'webp' });
  }

  if (options.resize) {
    result.resize = await upload.do({ option: 'resize', resizeConfig });
  }

  if (options.gray || options.grey) {
    result.grey = await upload.do({ option: 'grey' })
  }

  // TODO implement
  const response = {
    statusCode: 200,
    // body: JSON.parse(JSON.stringify(files)),
    body: 123,
  };

  return response;
};
