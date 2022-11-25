const { Readable } = require('stream');
const AWS = require('aws-sdk');
const multer = require('multer');
const sharp = require('sharp');

exports.handler = async (event, context, callback) => {
    console.log('######## ######## event #### ');
    console.log(event);
    console.log(`######## ######## context #### `);
    console.log(context);
    console.log(`######## ######## callback ####`);
    console.log(callback)

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
