const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
  

exports.handler = async (event) => {
 const {operator, rig, well, usState, county} = event.wellInfo
 let wellId = operator + "_" + rig + "_" + well
 const records = [...event.wellInfo.planRecords]
 const writeCycles = Math.ceil(records.length/25)
 let putItemsArray = []
 for (let idx = 1; idx<=writeCycles; idx++) {
     let startSlice = (idx * 25) - 25;
     let endSlice = idx * 25
     let currentIntervalOfRecords = records.slice(startSlice, endSlice)
     currentIntervalOfRecords.forEach((planItem, planIdx) => {  
         if (planIdx === 0) {
             return null
         }
         let item = {"Well_Id": {"S": wellId + idx + planIdx}, 
            "Operator": {"S": operator}, 
            "Rig": {"S": rig}, 
            "Well": {"S": well},
            "County": {"S": county}, 
            "State": {"S": usState}, 
            "MD": {"S": planItem[1].value}, 
            "INC": {"S": planItem[2].value},
            "AZM": {"S": planItem[3].value},
            "TVD": {"S": planItem[4].value},
            "Northing": {"S": planItem[5].value},
            "Easting": {"S": planItem[6].value},
            "VS": {"S": planItem[7].value},
            "DLS": {"S": planItem[8].value}
            }
         console.log(item)
         putItemsArray.push({
             "PutRequest": {"Item": item}
            })
        })  
     }
     console.log(putItemsArray)
     await dynamodb.batchWriteItem({RequestItems: {"Plans": putItemsArray}}, function(err, data){
         if (err) console.log(err)
         else {
             console.log("successful")
         }
     })
}


// const AWS = require("aws-sdk");
// const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
  

// exports.handler = (event, context, callback) => {
//   const records = [...event.wellInfo.planRecords]
//   let writeCycles = Math.ceil(records.length/25)
//   let putItemsArray = []
//   for (idx = 0; idx <= writeCycles; idx++) {
//     let startSlice = (idx * 25) - 25;
//     let endSlice = (idx + 1) * 25;
//     let currentIntervalofRecords = records.slice(startSlice, endSlice)
//     currentIntervalofRecords.forEach((planItem, idx) => {
//       if (idx === 0) {
//         return null
//       }
//       putItemsArray.push({
//         "PutRequest": {
//           "Item": {
//             "Well_Id": {
//                 S: event.operator + "_" + event.rig + "_" + event.well
//             },
//             "Operator": {
//               "S": event.operator
//             },
//             "County": {
//               "S": event.county
//             }, 
//             "Rig": {
//               "S": event.rig
//             },
//             "State": {
//               "S": event.usState
//             }, 
//             "MD": {
//               "S": event.planRecords[1].value
//             }, 
//             "INC": {
//               "S": event.planRecords[2].value
//             }, 
//             "AZM": {
//               "S": event.planRecords[3].value 
//             },
//             "TVD": {
//               "S": event.planRecords[4].value
//             },
//             "Northing": {
//               "S": event.planRecords[5].value
//             },
//             "Easting": {
//               "S": event.planRecords[6].value
//             },
//             "VS": {
//               "S": event.planRecords[7].value
//             },
//             "DLS": {
//               "S": event.planRecords[8].value
//             }
//           }
//         }
//       })
//     })
//     dynamodb.batchWriteItem({RequestItems: {"Plans": putItemsArray}}, function(err, data){
//       if (err) console.log(err);
//       else console.log(data)
//     })
//   }
// }
  
