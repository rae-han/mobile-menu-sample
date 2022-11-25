// const { Readable } = require('stream');
// const multer = require('multer');
// const sharp = require('sharp');

exports.handler = async (event, context, callback) => {
    console.log('callback', callback);
    console.log('context', context);
    console.log('event', event);

    console.log('event.body', event.body);
    const body = event.body;
    console.log('body', body);

    const bodyBuffer = Buffer.from(body, "base64").toString("utf8")
    const boundary = event.headers["Content-Type"]

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.parse(JSON.stringify(boundary)),
    };
    return response;
};
