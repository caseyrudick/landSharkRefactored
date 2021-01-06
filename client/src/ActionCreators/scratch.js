const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10"});

exports.handler = (event, context, callback) => {
    const type = event.type;
    if (type == "all") {
        const params = {
            TableName: "compare-yourself"
        };
        dynamodb.scan(params, function(err, data){
            if (err) {
                console.log(err)
                callback(err);
            } else {
                console.log(data)
                callback(null, data);
            }
        });
    } 
//     else if (type === "single") {
//         callback(null, "The single user data is here!");
//     } else {
//         callback(null, "Hello from Lambda");
//     }
// };