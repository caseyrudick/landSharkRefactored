const AWS = require("aws-sdk")
AWS.config.update({region: "us-east-2"})
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {
    const operator = event.item.split("-").map(word => word.trim())[0]
    const well = event.item.split("-").map(word => word.trim())[2]

    
    const params = {
        TableName: "HardLines",
        FilterExpression: "#operator = :operator and #well = :well",
        ExpressionAttributeNames: {
            "#operator": "Operator",
            "#well": "Well"
        },
        ExpressionAttributeValues: {
            ":operator": `${operator}`,
            ":well": `${operator}`
        }
    }
    
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err)
            callback(err)
        } else {
            console.log("successfully pulled hardLines")
            callback(null, data)
        }
    })
};
