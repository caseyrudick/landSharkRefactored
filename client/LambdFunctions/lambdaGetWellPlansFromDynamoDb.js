// const AWS = require("aws-sdk")
// //const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
// AWS.config.update({region: "us-east-2"})
// const docClient = new AWS.DynamoDB.DocumentClient()

// exports.handler = (event, context, callback) => {
//     const operator = event.item.split("-").map(word => word.trim())[0]
//     const well = event.item.split("-").map(word => word.trim())[2]

    
//     const params = {
//         TableName: "Plans",
//         FilterExpression: "#operatorVal = :val",
//         ExpressionAttributeNames: {
//             "#operatorVal": "Operator"
//         },
//         ExpressionAttributeValues: {
//             ":val": `${operator}`
//         }
//     }
    
//     docClient.scan(params, function(err, data) {
//         if (err) {
//             console.log(err)
//             callback(err)
//         } else {
//             console.log("successfully pulled plans")
//             callback(null, data)
//         }
//     })
// };
