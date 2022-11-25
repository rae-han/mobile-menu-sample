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

    const bodyBuffer = Buffer.from(body.toString(), "base64")


    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(bodyBuffer),
    };
    return response;
};
