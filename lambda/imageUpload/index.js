// const { Readable } = require('stream');
// const multer = require('multer');
// const sharp = require('sharp');

exports.handler = async (event, context, callback) => {
    console.log('######## ######## callback ########');
    console.log('callback', callback);
    console.log('######## ######## context ########');
    console.log(context);
    console.log('######## ######## event ########');
    console.log(event);

    console.log('######## ######## logic ########');
    console.log(event.body)
    console.log(JSON.parse(event.body));

    // TODO implement

    const response = {
        statusCode: 200,
        // body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
