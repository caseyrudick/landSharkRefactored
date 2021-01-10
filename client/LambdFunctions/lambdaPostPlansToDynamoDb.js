const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10" })
  

exports.handler = (event, context, callback) => {
  const records = [...event.wellInfo.planRecords]
  let writeCycles = Math.ceil(records.length/25)
  let putItemsArray = []
  for (idx = 0; idx <= writeCycles; idx++) {
    let startSlice = (idx * 25) - 25;
    let endSlice = (idx + 1) * 25;
    let currentIntervalofRecords = records.slice(startSlice, endSlice)
    currentIntervalofRecords.forEach((planItem, idx) => {
      if (idx === 0) {
        return null
      }
      putItemsArray.push({
        "PutRequest": {
          "Item": {
            "Well_Id": {
                S: event.operator + "_" + event.rig + "_" + event.well
            },
            "Operator": {
              "S": event.operator
            },
            "County": {
              "S": event.county
            }, 
            "Rig": {
              "S": event.rig
            },
            "State": {
              "S": event.usState
            }, 
            "MD": {
              "S": event.planRecords[1].value
            }, 
            "INC": {
              "S": event.planRecords[2].value
            }, 
            "AZM": {
              "S": event.planRecords[3].value 
            },
            "TVD": {
              "S": event.planRecords[4].value
            },
            "Northing": {
              "S": event.planRecords[5].value
            },
            "Easting": {
              "S": event.planRecords[6].value
            },
            "VS": {
              "S": event.planRecords[7].value
            },
            "DLS": {
              "S": event.planRecords[8].value
            }
          }
        }
      })
    })
    dynamodb.batchWriteItem({RequestItems: {"Plans": putItemsArray}}, function(err, data){
      if (err) console.log(err);
      else console.log(data)
    })
  }
}
  
