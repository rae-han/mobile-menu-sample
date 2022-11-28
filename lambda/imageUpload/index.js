// const { Readable } = require('stream');
// const multer = require('multer');
// const sharp = require('sharp');
const parser = require('lambda-multipart-parser');

exports.handler = async (event, context, callback) => {
    console.log('callback', callback);
    console.log('context', context);
    console.log('event', event);

    console.log('event.body', event.body);
    // const body = event.body;
    // console.log('body', body);
    //
    // const bodyBuffer = Buffer.from(body, "base64").toString("utf8")
    // const contentType = event.headers["Content-Type"] || event.headers["content-type"];
    //
    // const contentTypes = contentType.split(';');
    // let boundary = '';
    //
    // if (contentTypes) {
    //     const boundaryString = contentTypes.find((item) => item.trim().includes('boundary'))
    //     boundary = boundaryString.trim().split('=')[1];
    // }


    const result = await parser.parse(event);
    const files = result.files;

    console.log(files);

    // TODO implement
    const response = {
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: 200,
        // body: JSON.parse(JSON.stringify(files)),
        body: 123,
    };

    return response;
};
