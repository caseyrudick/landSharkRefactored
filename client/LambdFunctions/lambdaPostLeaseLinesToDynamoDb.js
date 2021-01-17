const AWS = require("aws-sdk")
// const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
AWS.config.update({region: "us-east-2"})
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {
    const {operator, rig, well, usState, county, date} = event
    const wellId = operator + "_" + rig + "_" + well
    const records = [...event.LeaseLineRecords]
    const writeCycles = Math.ceil(records.length/25)
    let putItemsArray = []
    for (let idx = 1; idx <= writeCycles; idx++) {
         let startSlice = (idx * 25) - 25;
         let endSlice = idx * 25
         let currentIntervalOfRecords = records.slice(startSlice, endSlice)
         currentIntervalOfRecords.forEach((LeaseLineItem, LeaseLineIdx) => {
             if (LeaseLineIdx === 0) {
                 return null
             }
             let item = {
                 "LeaseLineId": wellId + "_" + String(LeaseLineItem[0].value),
                 "LeaseLineNumber": LeaseLineItem[0].value,
                 "Operator": operator,
                 "Rig": rig,
                 "Well": well,
                 "County": county,
                 "State": usState,
                 "Date": date,
                 "Northing": String(LeaseLineItem[1].value),
                 "Easting": String(LeaseLineItem[2].value)
             }
             putItemsArray.push({
                 "PutRequest": {"Item": item}
             })
         })
    }
    
    return dynamodb.batchWriteItem({RequestItems: {"LeaseLines": putItemsArray}}, function(err, data) {
        if (err) {
            console.log(err)
            callback(err)
        } else {
            console.log("successfully pushed LeaseLines")
            callback(null, data)
        }
    })
};
