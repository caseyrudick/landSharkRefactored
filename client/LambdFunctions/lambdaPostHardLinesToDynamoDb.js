// const AWS = require("aws-sdk")
// // const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
// AWS.config.update({region: "us-east-2"})
// const docClient = new AWS.DynamoDB.DocumentClient()

// exports.handler = (event, context, callback) => {
//     const {operator, rig, well, usState, county, date} = event
//     const wellId = operator + "_" + rig + "_" + well
//     const records = [...event.hardLineRecords]
//     const writeCycles = Math.ceil(records.length/25)
//     let putItemsArray = []
//     for (let idx = 1; idx <= writeCycles; idx++) {
//          let startSlice = (idx * 25) - 25;
//          let endSlice = idx * 25
//          let currentIntervalOfRecords = records.slice(startSlice, endSlice)
//          currentIntervalOfRecords.forEach((hardLineItem, hardLineIdx) => {
//              if (hardLineIdx === 0) {
//                  return null
//              }
//              let item = {
//                  "HardLineId": wellId + "_" + String(hardLineItem[0].value),
//                  "HardLineNumber": hardLineItem[0].value,
//                  "Operator": operator,
//                  "Rig": rig,
//                  "Well": well,
//                  "County": county,
//                  "State": usState,
//                  "Date": date,
//                  "Northing": String(hardLineItem[1].value),
//                  "Easting": String(hardLineItem[2].value)
//              }
//              putItemsArray.push({
//                  "PutRequest": {"Item": item}
//              })
//          })
//     }
    
//     return docClient.batchWrite({RequestItems: {"HardLines": putItemsArray}}, function(err, data) {
//         if (err) {
//             console.log(err)
//             callback(err)
//         } else {
//             console.log("successfully pushed hardLines")
//             callback(null, data)
//         }
//     })
// };


const AWS = require("aws-sdk")
const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
AWS.config.update({region: "us-east-2"})
// const docClient = new AWS.DynamoDB.DocumentClient()

 exports.handler = (event, context, callback) => {
    console.log(event.planRecords)
    const {operator, rig, well, usState, county, date, hardLineRecords} = event
    const wellId = operator + "_" + rig + "_" + well
    const forLoops = Math.ceil(event.hardLineRecords.length/25)

    for (let i = 1; i <= forLoops; i++) {

      const createBatchedRecords = () => {
        let batchedRecords = []
        const copyOfEventRecords = [...event.hardLineRecords]
 
        const sliceStart = (i * 25) - 25 
        const sliceEnd = (i * 25) 
        batchedRecords = copyOfEventRecords.slice(sliceStart, sliceEnd);
        return batchedRecords
      }

      const batchedRecords = createBatchedRecords()

      const formattedRecords = []

      batchedRecords.map((hardLineItem, mapIndex) => {
        if (i === 1 && mapIndex === 0) {

        } else {
          const putRequestObject = {
            PutRequest: {
              Item: {
                "HardLineId": {"S": String(wellId + "_" + String(hardLineItem[0].value))},
                "Hard_Line_Number" : { "S": String(hardLineItem[0].value)},
                "Operator": {"S": String(operator)},
                "Rig": {"S": rig},
                "Well": {"S": well},
                "County": {"S": county},  
                "State": {"S": usState},
                "Date": {"S": date},
                "Northing": {"S": hardLineItem[1].value},
                "Easting": {"S": hardLineItem[2].value},
              }
            }
          }
          formattedRecords.push(putRequestObject)
        } 
      }) 

      dynamodb.batchWriteItems({ RequestItems: { "HardLines": formattedRecords } }, function(err, data) {
        if (err) {
            console.log(err)
          callback(err)
        } else {
          callback(null, data)
        }
      });
    } 
  } 