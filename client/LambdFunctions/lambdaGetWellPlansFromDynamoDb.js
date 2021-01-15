const AWS = require("aws-sdk")
//const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
AWS.config.update({region: "us-east-2"})
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {
    console.log(event)
    const thisFuckingguy = "EOG"
   // const operator = event.item.split("-").map(word => word.trim())[0]
    // const well = event.item.split("-").map(word => word.trim())[2]

    
    const params = {
        TableName: "Plans",
        FilterExpression: "#operatorVal = :val",
        ExpressionAttributeNames: {
            "#operatorVal": "Operator"
        },
        ExpressionAttributeValues: {
            ":val": `${thisFuckingguy}`
        }
    }
    
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err)
            callback(err)
        } else {
            console.log("successfully pulled plans")
            callback(null, data)
        }
    })
};


// const AWS = require("aws-sdk")
// const dynamodb = new AWS.DynamoDB.DocumentClient({region: "us-east-2", apiVersion: "2012-08-10" })

// exports.handler = (event, context, callback) => {
//     const operator = event.split("-").map(word => word.trim())[0]
//     const well = event.split("-").map(word => word.trim())[2]
//     console.log(event)
//     const params = {
//         TableName: "Plans",
//         ExpressionAttributeValues: {
//             ":operatorName": {
//                 S: operator
//             }, ":wellName": {
//                 S: well
//             }
//         }, 
//         FilterExpression: "Operator = :operatorName AND Well = :wellName", 
//     }
//     dynamodb.scan(params, function(err, data) {
//         if (err) {
//             console.log(err)
//             callback(err)
//         } else {
//             console.log("successfully pulled plans")
//             callback(null, data)
//         }
//     })
// };

// ////

// const AWS = require("aws-sdk")
// AWS.config.update({region: "us-east-2"})
// const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.update({
//   TableName: "td_notes_sdk",
//   Key: {
//     user_id: "bb",
//     timestamp: 1
//   },
//   // we define # using ExpressionAttributeName & : for ExpressionAttributeValues
//   UpdateExpression: "set #t = :t",
//   ExpressionAttributeNames: {
//     "#t": "title"
//   },
//   ExpressionAttributeValues: {
//     ":t": "Updated title"
//   }
// }, (err, data)=>{
//   if (err){
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })



// const AWS = require("aws-sdk")
// const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })

// exports.handler = (event, context, callback) => {
    // const operator = event.item.split("-").map(word => word.trim())[0]
    // const well = event.item.split("-").map(word => word.trim())[2]

//     console.log(event['queryStringParameters'])
//     console.log(event)
    
//     const params = {
//         TableName: "Plans"
//         ExpressionAttributeValues: {
//             ":operatorName": {
//                 S: operator
//             }, ":wellName": {
//                 S: well
//             }
//         }, 
//         FilterExpression: "Operator = :operatorName", 
//     }
    dynamodb.scan(params, function(err, data) {
        if (err) {
            console.log(err)
            callback(err)
        } else {
            console.log("successfully pulled plans")
            callback(null, data)
        }
    })
};

